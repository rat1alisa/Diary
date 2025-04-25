import { useState } from "react";
import { LoginFormValues } from "../model/types";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  //перезаписываем и сохраняем новое состояние

  const login = async ({ username, password }: LoginFormValues) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    //собираем данные перед обработкой (1000 мс)
    console.log("Logged in:", { username, password });
    setLoading(false) //ЗАГРУЗКА ЗАВЕРШЕНА;
  };

  return { login, loading };
}

//КАСТОМНЫЙ ХУК, он будет вызываться при нажатии на кнопку 