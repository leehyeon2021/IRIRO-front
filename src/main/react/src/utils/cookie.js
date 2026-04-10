
//쿠기 설정
export const setCookie = (name, value ) => {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=86400`;
};

//쿠키 삭제 설정
export const deleteCookie = (name) => {
  document.cookie = `${name}=; path=/; max-age=0`;
};

//쿠키 가져오기
export const getCookie = (name) => {
  const cookies = document.cookie.split(";");

  for (const cookie of cookies) {
    const [key, value] = cookie.trim().split("=");
    if (key === name) return decodeURIComponent(value);
  }

  return null;
};