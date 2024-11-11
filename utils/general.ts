import axios from "axios";
import { Http } from "./http";

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const validateEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const validateUrl = (url: string) => {
  const re = /^(ftp|http|https):\/\/[^ "]+$/;
  return re.test(url);
};

export const getFileExtension = (filename: string) => {
  const parts = filename.split(".");
  if (parts.length > 1) {
    return parts[parts.length - 1];
  } else {
    return "";
  }
};

export const inputErrorHelper: any = (isError: boolean, errorMsg?: string) => {
  return {
    validationState: isError ? "invalid" : "",
    color: isError ? "error" : "",
    helperColor: isError ? "error" : "",
    errorMessage: isError ? errorMsg || "required" : "",
  };
};

export const vibrate = (duration: number | Array<number> = 50) => {
  if (typeof window?.navigator?.vibrate !== "undefined") {
    window?.navigator?.vibrate(duration);
  }
};

type AllowedType = Record<string, string | number | Boolean | any>;
export const queryString = <T extends AllowedType>(data?: T): string => {
  if (data) {
    let firstParam = false;
    const query = Object.keys(data).map((key, index) => {
      if (data[key] !== null && data[key] !== undefined && data[key] !== "") {
        let param = "";
        if (firstParam === false) {
          param = `?${key}=${data[key]}`;
          firstParam = true;
        } else {
          param = `&${key}=${data[key]}`;
        }
        return param;
      }
      return "";
    });
    return query.join("");
  }
  return "";
};

export const downloadFile = async (url: string, fileName: string) => {
  await new Http()
    .get(url + fileName)
    .then(async ({ data }) => {
      return data;
    })
    .then((data) => {
      axios({
        url: data,
        method: "GET",
        responseType: "blob",
        headers: {
          "Access-Control-Allow-Origin": "no-cors",
        },
      }).then((response) => {
        const href = URL.createObjectURL(response.data);
        const link = document.createElement("a");
        link.href = href;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

export const deslugify = (slug: string) => {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

export const isUUID = (uuid: string = "") => {
  const pattern = new RegExp(
    "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$",
  );
  return pattern.test(uuid);
};

export const isUrl = (text: string = "") => {
  const pattern = new RegExp('^(ftp|http|https)://[^ "\n]+');
  return pattern.test(text);
};
