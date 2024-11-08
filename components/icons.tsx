import * as React from "react";
import { IconSvgProps } from "@/types";

export const Home: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  color,
  ...props
}) => (
  <svg
    fill="none"
    height={24}
    viewBox="0 0 24 23"
    width={23}
    {...props}
  >
    <path d="M11.4937 0.700106L11.4938 0.699941C11.6262 0.572582 11.804 0.5 12.0001 0.5C12.1959 0.5 12.3739 0.572578 12.5065 0.700104L23.3521 11.1291C23.4731 11.2455 23.4938 11.3204 23.498 11.3412C23.5019 11.3608 23.499 11.3714 23.4983 11.3733C23.4963 11.3782 23.4909 11.3889 23.4742 11.4007C23.459 11.4114 23.395 11.4512 23.2278 11.4512H21.9704H21.4704V11.9512V21.2203C21.4704 21.9062 20.8862 22.5 20.2295 22.5H15.0876V16.7174V16.2174H14.5876H9.26764H8.76764V16.7174V22.5H3.77047C3.10006 22.5 2.49338 21.906 2.49338 21.2203V11.9512V11.4512H1.99338H0.772177C0.604936 11.4512 0.54089 11.4114 0.525657 11.4007C0.508687 11.3887 0.503546 11.3779 0.501719 11.3734C0.501068 11.3715 0.498081 11.3609 0.502048 11.3413C0.506268 11.3204 0.526925 11.2454 0.647928 11.1291L0.647975 11.1291L11.4937 0.700106Z" stroke={color}/>
  </svg>
);

export const Dokumen: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  color,
  ...props
}) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.96875 24H19.0312C20.1944 24 21.1406 23.0538 21.1406 21.8906V7.03125H16.2188C15.0556 7.03125 14.1094 6.08503 14.1094 4.92188V0H4.96875C3.80559 0 2.85938 0.946219 2.85938 2.10938V21.8906C2.85938 23.0538 3.80559 24 4.96875 24ZM7.78125 9.89062H16.2188C16.6074 9.89062 16.9219 10.2051 16.9219 10.5938C16.9219 10.9824 16.6074 11.2969 16.2188 11.2969H7.78125C7.39261 11.2969 7.07812 10.9824 7.07812 10.5938C7.07812 10.2051 7.39261 9.89062 7.78125 9.89062ZM7.78125 12.7031H16.2188C16.6074 12.7031 16.9219 13.0176 16.9219 13.4062C16.9219 13.7949 16.6074 14.1094 16.2188 14.1094H7.78125C7.39261 14.1094 7.07812 13.7949 7.07812 13.4062C7.07812 13.0176 7.39261 12.7031 7.78125 12.7031ZM7.78125 15.5156H16.2188C16.6074 15.5156 16.9219 15.8301 16.9219 16.2188C16.9219 16.6074 16.6074 16.9219 16.2188 16.9219H7.78125C7.39261 16.9219 7.07812 16.6074 7.07812 16.2188C7.07812 15.8301 7.39261 15.5156 7.78125 15.5156ZM7.78125 18.3281H13.4062C13.7949 18.3281 14.1094 18.6426 14.1094 19.0312C14.1094 19.4199 13.7949 19.7344 13.4062 19.7344H7.78125C7.39261 19.7344 7.07812 19.4199 7.07812 19.0312C7.07812 18.6426 7.39261 18.3281 7.78125 18.3281Z" fill={color}/>
    <path d="M16.2188 5.625H20.7286L15.5156 0.411987V4.92188C15.5156 5.30982 15.8308 5.625 16.2188 5.625Z" fill={color}/>
  </svg>
);

export const Informasi: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  color,
  ...props
}) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.89996 21.4538V22.1044C5.89996 22.3812 5.83546 22.6444 5.71546 22.8751H21.2322C22.0535 22.8751 22.7315 22.2477 22.8147 21.4448L5.89996 21.4538ZM2.84921 1.12505C2.48921 1.12505 1.50001 1.42018 1.50001 1.78505V2.57368H3.50884V1.78505C3.50884 1.42018 4.50001 1.00001 2.84921 1.12505ZM5.89996 10.1914H10.694V18.1043H5.89996V10.1914Z" fill={color}/>
    <path d="M20.9902 1.76625C20.9902 1.41113 20.6996 1.125 20.3441 1.125H3.282C3.38072 1.33093 3.43125 1.55664 3.42975 1.785V22.1044C3.42975 22.5289 3.78037 22.875 4.20487 22.875C4.40916 22.8747 4.605 22.7934 4.74946 22.649C4.89391 22.5045 4.9752 22.3087 4.9755 22.1044V20.9925C4.9755 20.7386 5.18287 20.5312 5.43675 20.5312L20.9902 20.5219V1.76625ZM17.7742 5.58675C17.4076 5.58556 17.0562 5.43934 16.797 5.18002C16.5377 4.92069 16.3916 4.56932 16.3905 4.20262C16.3907 3.83562 16.5365 3.4837 16.796 3.22412C17.0554 2.96454 17.4072 2.81852 17.7742 2.81813C17.9568 2.81694 18.1378 2.85187 18.3068 2.92092C18.4759 2.98997 18.6295 3.09176 18.7591 3.22044C18.8886 3.34912 18.9914 3.50215 19.0615 3.67071C19.1316 3.83928 19.1678 4.02005 19.1677 4.20262C19.1677 4.45613 18.9649 4.66388 18.7065 4.66388C18.4526 4.66388 18.2452 4.45613 18.2452 4.20262C18.2452 3.94387 18.042 3.74137 17.7836 3.74137C17.5204 3.74137 17.313 3.94387 17.313 4.20262C17.313 4.45613 17.5204 4.66388 17.7742 4.66388C18.1412 4.66417 18.4931 4.8101 18.7526 5.0696C19.0122 5.32911 19.1581 5.681 19.1584 6.048C19.1573 6.41469 19.0112 6.76606 18.7519 7.02539C18.4926 7.28472 18.1413 7.43094 17.7746 7.43213C17.4076 7.43193 17.0557 7.2861 16.7961 7.02666C16.5365 6.76722 16.3905 6.41538 16.3901 6.04838C16.3901 5.78962 16.593 5.58675 16.8514 5.58675C17.1052 5.58675 17.3126 5.78963 17.3126 6.048C17.3126 6.30188 17.5159 6.50925 17.7742 6.50925C18.0281 6.50925 18.2355 6.30188 18.2355 6.048C18.2355 5.78963 18.0281 5.58675 17.7742 5.58675ZM8.46787 3.27975C8.46787 3.021 8.67562 2.8185 8.92912 2.8185H10.7749C11.0336 2.8185 11.2361 3.021 11.2361 3.27975C11.2361 3.53363 11.0336 3.741 10.7749 3.741H9.39112V4.65938H10.7749C11.0336 4.65938 11.2361 4.86675 11.2361 5.12063C11.2361 5.3745 11.0336 5.58187 10.7749 5.58187H9.39112V6.50925H10.7749C11.0336 6.50925 11.2361 6.7125 11.2361 6.9705C11.2361 7.22475 11.0336 7.43213 10.7749 7.43213H8.9295C8.67562 7.43213 8.46825 7.22475 8.46825 6.97088V3.27975H8.46787ZM4.9755 3.27975C4.9755 3.0675 5.12287 2.8785 5.33062 2.832C5.43183 2.80793 5.53819 2.8185 5.63268 2.862C5.72718 2.90551 5.80436 2.97945 5.85187 3.072L6.82087 5.0145V3.27975C6.82087 3.021 7.02862 2.8185 7.28212 2.8185C7.54087 2.8185 7.74337 3.021 7.74337 3.27975V6.97088C7.74337 7.18313 7.596 7.36762 7.38825 7.41825C7.28717 7.4414 7.18125 7.42987 7.08751 7.38552C6.99378 7.34117 6.9177 7.26658 6.8715 7.17375L5.898 5.23125V6.97088C5.898 7.22475 5.69512 7.43213 5.43675 7.43213C5.18287 7.43213 4.9755 7.22475 4.9755 6.97088V3.27975ZM11.6149 18.5655C11.6149 18.8194 11.4071 19.0267 11.1536 19.0267H5.43637C5.1825 19.0267 4.97512 18.8194 4.97512 18.5655V9.73013C4.97512 9.47625 5.1825 9.26888 5.43637 9.26888H11.1529C11.4067 9.26888 11.6141 9.47625 11.6141 9.73013L11.6149 18.5655ZM12.579 7.05863L11.8687 3.3675C11.8458 3.24759 11.8713 3.12349 11.9396 3.02231C12.0079 2.92113 12.1135 2.85109 12.2332 2.8275C12.2927 2.81564 12.3538 2.81569 12.4132 2.82763C12.4726 2.83957 12.5291 2.86317 12.5793 2.89707C12.6295 2.93097 12.6725 2.97449 12.7058 3.02511C12.7391 3.07574 12.762 3.13246 12.7732 3.192L13.1839 5.3235L13.3316 4.959C13.3644 4.874 13.4219 4.80082 13.4968 4.74898C13.5718 4.69715 13.6605 4.66906 13.7516 4.66838C13.9451 4.66838 14.1112 4.7745 14.1851 4.9455L14.3602 5.36063L14.7435 3.20138C14.7847 2.9475 15.0247 2.78137 15.2786 2.8275C15.5276 2.86875 15.6937 3.10875 15.6521 3.35812L15.0019 7.04925C14.9848 7.1472 14.9366 7.23701 14.8642 7.30522C14.7919 7.37343 14.6994 7.41637 14.6006 7.42762C14.5819 7.43212 14.5631 7.43213 14.5451 7.43213C14.3602 7.43213 14.1941 7.3215 14.1206 7.15088L13.7745 6.3435L13.4606 7.1415C13.4239 7.23416 13.3583 7.3125 13.2735 7.36487C13.1887 7.41723 13.0893 7.44082 12.99 7.43213C12.89 7.42373 12.7955 7.38258 12.7213 7.31505C12.6471 7.24752 12.5968 7.15739 12.579 7.05863ZM18.9832 18.6071H13.428C13.1741 18.6071 12.9667 18.3994 12.9667 18.1459C12.9667 17.8924 13.1741 17.6846 13.428 17.6846H18.9832C19.2367 17.6846 19.4445 17.892 19.4445 18.1459C19.4445 18.3997 19.2367 18.6071 18.9832 18.6071ZM18.9832 16.6091H13.428C13.1741 16.6091 12.9667 16.4018 12.9667 16.1479C12.9667 15.894 13.1741 15.6866 13.428 15.6866H18.9832C19.2367 15.6866 19.4445 15.894 19.4445 16.1479C19.4445 16.4018 19.2367 16.6091 18.9832 16.6091ZM18.9832 14.6115H13.428C13.1741 14.6115 12.9667 14.4038 12.9667 14.1503C12.9667 13.8915 13.1741 13.689 13.428 13.689H18.9832C19.2367 13.689 19.4445 13.8915 19.4445 14.1503C19.4445 14.4038 19.2367 14.6115 18.9832 14.6115ZM18.9832 12.609H13.428C13.1741 12.609 12.9667 12.4061 12.9667 12.1478C12.9667 11.8939 13.1741 11.6865 13.428 11.6865H18.9832C19.2367 11.6865 19.4445 11.8939 19.4445 12.1478C19.4445 12.4061 19.2367 12.609 18.9832 12.609ZM18.9832 10.6114H13.428C13.1741 10.6114 12.9667 10.4036 12.9667 10.1501C12.9667 9.89662 13.1741 9.6885 13.428 9.6885H18.9832C19.2367 9.6885 19.4445 9.89587 19.4445 10.1497C19.4445 10.4036 19.2367 10.611 18.9832 10.611V10.6114Z" fill={color}/>
  </svg>
);

export const Translation: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  color,
  ...props
}) => (
  <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.67149 16.1978V4.09644H0V21.9799L4.42228 18.8693H19.1277V16.2106L19.1095 16.1978H2.67149Z" fill={color}/>
    <path d="M4.07628 14.793H19.5777L24 17.9037V0.0201416H4.07628V14.793ZM14.8942 3.61926H16.5772L18.5189 8.23334V3.55043H19.9237V11.1939H18.2407L16.299 6.57986V11.2628H14.8942V3.61926ZM8.15251 3.61926H12.8266V5.02405H9.5573V6.70418H12.0554V8.10897H9.5573V9.7891H12.8266V11.1939H8.15251V3.61926Z" fill={color}/>
  </svg>
);

export const Statistik: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  color,
  ...props
}) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 9.42683H0.858577C0.386611 9.42683 0.00502092 9.80842 0 10.2854V23.139C0 23.616 0.386611 23.9975 0.858577 23.9975H6C6.47699 23.9975 6.85858 23.6109 6.85858 23.139V10.2854C6.85858 9.80842 6.47197 9.42683 6 9.42683ZM14.5707 0.00256348H9.42929C8.95732 0.00256348 8.57071 0.384153 8.57071 0.85612V23.139C8.57071 23.616 8.95732 23.9975 9.42929 23.9975H14.5707C15.0477 23.9975 15.4293 23.6109 15.4293 23.139V0.861141C15.4293 0.384153 15.0427 0.00256348 14.5707 0.00256348ZM23.1414 6.85612H18C17.523 6.85612 17.1414 7.23771 17.1414 7.7147V23.139C17.1414 23.616 17.528 23.9975 18 23.9975H23.1414C23.6184 23.9975 24 23.6109 24 23.139V7.7147C24 7.23771 23.6134 6.85612 23.1414 6.85612Z" fill={color}/>
  </svg>
);

export const Logo: React.FC<IconSvgProps> = ({
  size = 36,
  width,
  height,
  ...props
}) => (
  <svg
    fill="none"
    height={size || height}
    viewBox="0 0 32 32"
    width={size || width}
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const DiscordIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z"
        fill="currentColor"
      />
    </svg>
  );
};

export const TwitterIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
        fill="currentColor"
      />
    </svg>
  );
};

export const GithubIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export const MoonFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
      fill="currentColor"
    />
  </svg>
);

export const SunFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <g fill="currentColor">
      <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
      <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
    </g>
  </svg>
);

export const HeartFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
      fill="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);

export const SearchIcon = ({
  size,
  fill,
  width = 24,
  height = 24,
  ...props
}: IconSvgProps) => {
  return (
    <svg
      fill="none"
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M11.5 21a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19ZM22 22l-2-2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );
};

export const NextUILogo: React.FC<IconSvgProps> = (props) => {
  const { width, height = 40 } = props;

  return (
    <svg
      fill="none"
      height={height}
      viewBox="0 0 161 32"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        className="fill-black dark:fill-white"
        d="M55.6827 5V26.6275H53.7794L41.1235 8.51665H40.9563V26.6275H39V5H40.89L53.5911 23.1323H53.7555V5H55.6827ZM67.4831 26.9663C66.1109 27.0019 64.7581 26.6329 63.5903 25.9044C62.4852 25.185 61.6054 24.1633 61.0537 22.9582C60.4354 21.5961 60.1298 20.1106 60.1598 18.6126C60.132 17.1113 60.4375 15.6228 61.0537 14.2563C61.5954 13.0511 62.4525 12.0179 63.5326 11.268C64.6166 10.5379 65.8958 10.16 67.1986 10.1852C68.0611 10.1837 68.9162 10.3468 69.7187 10.666C70.5398 10.9946 71.2829 11.4948 71.8992 12.1337C72.5764 12.8435 73.0985 13.6889 73.4318 14.6152C73.8311 15.7483 74.0226 16.9455 73.9968 18.1479V19.0773H63.2262V17.4194H72.0935C72.1083 16.4456 71.8952 15.4821 71.4714 14.6072C71.083 13.803 70.4874 13.1191 69.7472 12.6272C68.9887 12.1348 68.1022 11.8812 67.2006 11.8987C66.2411 11.8807 65.3005 12.1689 64.5128 12.7223C63.7332 13.2783 63.1083 14.0275 62.6984 14.8978C62.2582 15.8199 62.0314 16.831 62.0352 17.8546V18.8476C62.009 20.0078 62.2354 21.1595 62.6984 22.2217C63.1005 23.1349 63.7564 23.9108 64.5864 24.4554C65.4554 24.9973 66.4621 25.2717 67.4831 25.2448C68.1676 25.2588 68.848 25.1368 69.4859 24.8859C70.0301 24.6666 70.5242 24.3376 70.9382 23.919C71.3183 23.5345 71.6217 23.0799 71.8322 22.5799L73.5995 23.1604C73.3388 23.8697 72.9304 24.5143 72.4019 25.0506C71.8132 25.6529 71.1086 26.1269 70.3314 26.4434C69.4258 26.8068 68.4575 26.9846 67.4831 26.9663V26.9663ZM78.8233 10.4075L82.9655 17.325L87.1076 10.4075H89.2683L84.1008 18.5175L89.2683 26.6275H87.103L82.9608 19.9317L78.8193 26.6275H76.6647L81.7711 18.5169L76.6647 10.4062L78.8233 10.4075ZM99.5142 10.4075V12.0447H91.8413V10.4075H99.5142ZM94.2427 6.52397H96.1148V22.3931C96.086 22.9446 96.2051 23.4938 96.4597 23.9827C96.6652 24.344 96.9805 24.629 97.3589 24.7955C97.7328 24.9548 98.1349 25.0357 98.5407 25.0332C98.7508 25.0359 98.9607 25.02 99.168 24.9857C99.3422 24.954 99.4956 24.9205 99.6283 24.8853L100.026 26.5853C99.8062 26.6672 99.5805 26.7327 99.3511 26.7815C99.0274 26.847 98.6977 26.8771 98.3676 26.8712C97.6854 26.871 97.0119 26.7156 96.3973 26.4166C95.7683 26.1156 95.2317 25.6485 94.8442 25.0647C94.4214 24.4018 94.2097 23.6242 94.2374 22.8363L94.2427 6.52397ZM118.398 5H120.354V19.3204C120.376 20.7052 120.022 22.0697 119.328 23.2649C118.644 24.4235 117.658 25.3698 116.477 26.0001C115.168 26.6879 113.708 27.0311 112.232 26.9978C110.759 27.029 109.302 26.6835 107.996 25.9934C106.815 25.362 105.827 24.4161 105.141 23.2582C104.447 22.0651 104.092 20.7022 104.115 19.319V5H106.08V19.1831C106.061 20.2559 106.324 21.3147 106.843 22.2511C107.349 23.1459 108.094 23.8795 108.992 24.3683C109.993 24.9011 111.111 25.1664 112.242 25.139C113.373 25.1656 114.493 24.9003 115.495 24.3683C116.395 23.8815 117.14 23.1475 117.644 22.2511C118.16 21.3136 118.421 20.2553 118.402 19.1831L118.398 5ZM128 5V26.6275H126.041V5H128Z"
      />
      <path
        className="fill-black dark:fill-white"
        d="M23.5294 0H8.47059C3.79241 0 0 3.79241 0 8.47059V23.5294C0 28.2076 3.79241 32 8.47059 32H23.5294C28.2076 32 32 28.2076 32 23.5294V8.47059C32 3.79241 28.2076 0 23.5294 0Z"
      />
      <path
        className="fill-white dark:fill-black"
        d="M17.5667 9.21729H18.8111V18.2403C18.8255 19.1128 18.6 19.9726 18.159 20.7256C17.7241 21.4555 17.0968 22.0518 16.3458 22.4491C15.5717 22.8683 14.6722 23.0779 13.6473 23.0779C12.627 23.0779 11.7286 22.8672 10.9521 22.4457C10.2007 22.0478 9.5727 21.4518 9.13602 20.7223C8.6948 19.9705 8.4692 19.1118 8.48396 18.2403V9.21729H9.72854V18.1538C9.71656 18.8298 9.88417 19.4968 10.2143 20.0868C10.5362 20.6506 11.0099 21.1129 11.5814 21.421C12.1689 21.7448 12.8576 21.9067 13.6475 21.9067C14.4374 21.9067 15.1272 21.7448 15.7169 21.421C16.2895 21.1142 16.7635 20.6516 17.0844 20.0868C17.4124 19.4961 17.5788 18.8293 17.5667 18.1538V9.21729ZM23.6753 9.21729V22.845H22.4309V9.21729H23.6753Z"
      />
    </svg>
  );
};

export const PlayIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  color,
  ...props
}) => (
  <svg width="8" height="10" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.25 0.75293V29.8066L23.4657 15.2797L0.25 0.75293Z" fill="white"/>
  </svg>
);

export const CloseIcon = ({ size = 24 }: IconSvgProps) => {
  return (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_137_1440)">
      <path d="M24 12.5428C24 18.5598 18.8927 23.5109 12.5 23.5109C6.1073 23.5109 1 18.5598 1 12.5428C1 6.52582 6.1073 1.57471 12.5 1.57471C18.8927 1.57471 24 6.52582 24 12.5428Z" fill="#E64B4B" stroke="#666666" stroke-width="2"/>
      <path d="M8.00012 16.8514L12.5001 12.5429L17.0001 8.23438" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
      <path d="M8.00012 8.23438L12.5001 12.5429L17.0001 16.8514" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
      </g>
      <defs>
      <clipPath id="clip0_137_1440">
      <rect width="25" height="23.9362" fill="white" transform="translate(0 0.574707)"/>
      </clipPath>
      </defs>
    </svg>
  );
};

export const BackIcon = ({ size = 14 }: IconSvgProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        fill-rule="evenodd"
        points="3 7 10.433 14 12 12.524 6.134 7 12 1.476 10.433 0"
      ></polygon>
    </svg>
  );
};

export const ChevronDownIcon = () => (
  <svg
    fill="none"
    height="14"
    viewBox="0 0 24 24"
    width="14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.9188 8.17969H11.6888H6.07877C5.11877 8.17969 4.63877 9.33969 5.31877 10.0197L10.4988 15.1997C11.3288 16.0297 12.6788 16.0297 13.5088 15.1997L15.4788 13.2297L18.6888 10.0197C19.3588 9.33969 18.8788 8.17969 17.9188 8.17969Z"
      fill="currentColor"
    />
  </svg>
);

export const TableIcon = ({ size, ...props }: IconSvgProps) => {
  return (
    <svg
      width={size || "16"}
      height={size || "16"}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm0 2 .001 4H5V5h14zM5 11h8v8H5v-8zm10 8v-8h4.001l.001 8H15z"
        fill="currentColor"
      ></path>
    </svg>
  );
};