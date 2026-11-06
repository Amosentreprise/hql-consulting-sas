/* Cloudinary — envoi d'images "unsigned" depuis le navigateur + URLs optimisées. */
const CLOUD = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string | undefined;
const PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string | undefined;

export const isCloudinaryConfigured = Boolean(CLOUD && PRESET);

export type UploadedImage = { url: string; publicId: string; width: number; height: number };

const MAX_BYTES = 10 * 1024 * 1024;

export function uploadImage(
  file: File,
  folder = "hql",
  onProgress?: (percent: number) => void,
): Promise<UploadedImage> {
  return new Promise((resolve, reject) => {
    if (!isCloudinaryConfigured) {
      reject(new Error("Cloudinary n'est pas configuré (VITE_CLOUDINARY_CLOUD_NAME / VITE_CLOUDINARY_UPLOAD_PRESET)."));
      return;
    }
    if (!file.type.startsWith("image/")) {
      reject(new Error("Le fichier doit être une image (JPG, PNG, WebP, SVG…)."));
      return;
    }
    if (file.size > MAX_BYTES) {
      reject(new Error("Image trop lourde (10 Mo maximum)."));
      return;
    }

    const body = new FormData();
    body.append("file", file);
    body.append("upload_preset", PRESET!);
    body.append("folder", folder);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) onProgress?.(Math.round((event.loaded / event.total) * 100));
    };
    xhr.onerror = () => reject(new Error("Échec réseau pendant l'envoi de l'image."));
    xhr.onload = () => {
      try {
        const data = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve({ url: data.secure_url, publicId: data.public_id, width: data.width, height: data.height });
        } else {
          reject(new Error(data?.error?.message || "Cloudinary a refusé l'envoi."));
        }
      } catch {
        reject(new Error("Réponse Cloudinary illisible."));
      }
    };
    xhr.send(body);
  });
}

/**
 * Renvoie une URL optimisée (format + qualité automatiques, largeur limitée).
 * Les images qui ne viennent pas de Cloudinary (ex. /images/...) sont renvoyées telles quelles.
 */
export function optimize(url: string | undefined | null, width = 1200): string {
  if (!url) return "";
  if (!url.includes("res.cloudinary.com") || !url.includes("/upload/")) return url;
  return url.replace("/upload/", `/upload/f_auto,q_auto,c_limit,w_${width}/`);
}
