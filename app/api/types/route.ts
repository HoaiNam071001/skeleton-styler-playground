// app/api/types/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Hàm đệ quy để lấy tất cả các file trong thư mục
function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

export async function GET() {
  try {
    const libBasePath = path.join(process.cwd(), 'node_modules', 'skeleton-styler');
    const distPath = path.join(libBasePath, 'dist');

    if (!fs.existsSync(distPath)) {
      return NextResponse.json({ error: "Thư mục không tồn tại" }, { status: 404 });
    }

    // Lấy toàn bộ file trong thư mục dist
    const allFiles = getAllFiles(distPath);

    // Lọc ra các file .d.ts và đọc nội dung
    const types = allFiles
      .filter((file) => file.endsWith('.d.ts'))
      .map((filePath) => {
        const content = fs.readFileSync(filePath, 'utf-8');
        // Tạo đường dẫn ảo cho Monaco (chuyển đổi \ thành / cho Windows)
        const relativePath = path.relative(libBasePath, filePath).replace(/\\/g, '/');

        return {
          // Monaco cần đường dẫn dạng file:///node_modules/...
          path: `file:///node_modules/skeleton-styler/${relativePath}`,
          content,
        };
      });

    return NextResponse.json(types);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
