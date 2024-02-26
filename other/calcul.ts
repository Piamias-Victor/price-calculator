import { NumberHandle } from "@/libs/react/number";

export function Calcul(coef: NumberHandle, heure: NumberHandle, old: NumberHandle) {
    var number = 0.0;
    if (coef.current <= 200)
        number = 11.27
    if (coef.current >= 210 && coef.current <= 220)
        number = 11.28
    if (coef.current >= 225 && coef.current < 230)
        number = 11.28
    if (coef.current >= 230 && coef.current < 240)
        number = 11.31
    if (coef.current >= 240 && coef.current < 250)
        number = 11.81
    if (coef.current >= 250 && coef.current < 260)
        number = 12.30
    if (coef.current >= 260 && coef.current < 270)
        number = 12.79
    if (coef.current >= 270 && coef.current < 280)
        number = 13.28
    if (coef.current >= 280 && coef.current < 290)
        number = 13.77
    if (coef.current >= 290 && coef.current < 300)
        number = 14.27
    if (coef.current >= 300 && coef.current < 310)
        number = 14.76
    if (coef.current >= 310 && coef.current < 320)
        number = 15.25
    if (coef.current >= 320 && coef.current < 330)
        number = 15.74
    if (coef.current >= 330 && coef.current < 400)
        number = 16.23
    if (coef.current >= 400 && coef.current < 430)
        number = 19.68
    if (coef.current >= 430 && coef.current < 470)
        number = 21.15
    if (coef.current >= 470 && coef.current < 500)
        number = 23.12
    if (coef.current >= 500 && coef.current < 600)
        number = 24.59
    if (coef.current >= 600 && coef.current < 800)
        number = 29.51
    if (coef.current >= 800)
        number = 39.35
    if (old.current >= 3 && old.current < 6)
        number += number * 0.03
    if (old.current >= 6 && old.current < 9)
        number += number * 0.06
    if (old.current >= 9 && old.current < 12)
        number += number * 0.09
    if (old.current >= 12 && old.current < 15)
        number += number * 0.12
    if (old.current >= 15)
        number += number * 0.15
    return number;
  }