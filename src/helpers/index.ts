import { IContent } from "@/types";

export const getUserInitials = (firstName: string, lastName: string) => {
  return `${firstName[0]}${lastName[0]}`;
};

export const readJsonFile = (file: Blob): Promise<IContent> =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = (event) => {
      if (event.target) {
        resolve(JSON.parse(event.target.result as string));
      }
    };

    fileReader.onerror = (error) => reject(error);
    fileReader.readAsText(file);
  });
