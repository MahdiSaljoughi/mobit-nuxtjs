import { defineEventHandler } from "h3";
import type { H3Event } from "h3";
import gurd from "../../../utils/gurd";
import * as fs from "fs/promises";
import * as path from "path";
import formidable from "formidable";
import prisma from "../../../../../prisma/prisma";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default defineEventHandler(async (event: H3Event) => {
  try {
    const gurds = await gurd(event);
    if (gurds.status_code !== 200 || gurds.is_admin !== true) {
      return { status_code: 401, message: "Unauthorized" };
    }

    const form = formidable({
      multiples: true,
      keepExtensions: true,
    });

    const { fields, files } = await new Promise<{ fields: any; files: any }>(
      (resolve, reject) => {
        form.parse(event.node.req, (err, fields, files) => {
          if (err)
            reject({ status_code: 500, message: "Error parsing form data" });
          resolve({ fields, files });
        });
      }
    );

    const productId = fields.product_id?.[0] || fields.product_id;

    if (!productId) {
      return { status_code: 400, message: "Product ID is required" };
    }

    if (!files.image) {
      return { status_code: 400, message: "No files uploaded" };
    }

    const images = Array.isArray(files.image) ? files.image : [files.image];

    // تعریف دو دایرکتوری برای بارگذاری
    const uploadDir1 = path.join(
      process.cwd(),
      ".output/public/uploads/images/products"
    );
    const uploadDir2 = path.join(
      process.cwd(),
      "src/public/uploads/images/products"
    );

    // ایجاد دایرکتوری‌ها
    await Promise.all([
      fs.mkdir(uploadDir1, { recursive: true }),
      fs.mkdir(uploadDir2, { recursive: true }),
    ]);

    const uploadedImages = await Promise.all(
      images.map(
        async (file: {
          filepath: string;
          originalFilename: string;
          path: string;
        }) => {
          const oldPath = file.filepath || file.path;
          if (!oldPath) throw new Error("File path is undefined");

          const fileExt = path.extname(file.originalFilename);
          const uniqueFileName = `${Date.now()}-${Math.random()
            .toString(36)
            .substring(7)}${fileExt}`;

          // مسیرهای جدید برای هر دو دایرکتوری
          const newPath1 = path.join(uploadDir1, uniqueFileName);
          const newPath2 = path.join(uploadDir2, uniqueFileName);

          // انتقال فایل به دایرکتوری اول
          await fs.rename(oldPath, newPath1);

          // کپی فایل به دایرکتوری دوم
          await fs.copyFile(newPath1, newPath2);

          return `/uploads/images/products/${uniqueFileName}`;
        }
      )
    );

    // ذخیره آدرس‌ها در پایگاه داده
    const data = await prisma.productImage.createMany({
      data: uploadedImages.map((url) => ({
        url,
        product_id: Number(productId),
      })),
    });

    return {
      status_code: 201,
      message: "Files uploaded successfully",
      data: {
        data,
        productId,
        imageUrls: uploadedImages,
      },
    };
  } catch (error) {
    console.error("Upload Error:", error);
    return {
      // @ts-expect-error
      status_code: error.status_code || 500,
      // @ts-expect-error
      message: error.message || "Internal server error",
    };
  }
});
