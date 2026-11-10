import { useState } from "react";
import { Link } from "react-router";
import bmr from "./../assets/bmr.png";
import Swal from "sweetalert2";

export default function Bmr() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [bmrValue, setBmrValue] = useState(0);

  function calculateBmr(event) {
    event.preventDefault();

    if (weight === "" || height === "" || age === "") {
      Swal.fire({
        title: "กรุณากรอกข้อมูลให้ครบ",
        text: "กรุณาป้อนน้ำหนัก ส่วนสูง และอายุ",
        icon: "warning",
      });
      return;
    }

    const weightValue = Number(weight);
    const heightValue = Number(height);
    const ageValue = Number(age);
    if (weightValue <= 0 || heightValue <= 0 || ageValue <= 0) {
      Swal.fire({
        title: "ข้อมูลไม่ถูกต้อง",
        text: "น้ำหนัก ส่วนสูง และอายุต้องมากกว่า 0",
        icon: "warning",
      });
      return;
    }

    const calculatedBmr = gender === "male"
      ? 66 + 13.7 * weightValue + 5 * heightValue - 6.8 * ageValue
      : 665 + 9.6 * weightValue + 1.8 * heightValue - 4.7 * ageValue;
    setBmrValue(calculatedBmr);
  }

  function resetForm() {
    setWeight("");
    setHeight("");
    setAge("");
    setGender("male");
    setBmrValue(0);
  }

  return (
    <>
      <div className="w-[50%] border-1 border-gray-300 mt-30 mx-auto rounded-2xl
                      p-10 flex flex-col items-center gap-3 shadow-2xl">
        <h1 className="text-2xl font-bold text-blue-800">BMR Calculator</h1>
        <h3 className="text-xl text-gray-600">คำนวณ BMR</h3>
        <img src={bmr} alt="bmr" className="w-25 h-25" />

        <form className="w-full flex flex-col gap-3" onSubmit={calculateBmr}>
          <p className="text-lg font-kanit">ป้อนน้ำหนัก (kg):</p>
          <input
            type="number"
            placeholder="น้ำหนัก"
            className="border-1 border-gray-300 p-2 rounded-md"
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
          />
          <p className="text-lg font-kanit">ป้อนส่วนสูง (cm):</p>
          <input
            type="number"
            placeholder="ส่วนสูง"
            className="border-1 border-gray-300 p-2 rounded-md"
            value={height}
            onChange={(event) => setHeight(event.target.value)}
          />
          <p className="text-lg font-kanit">ป้อนอายุ (ปี):</p>
          <input
            type="number"
            placeholder="อายุ"
            className="border-1 border-gray-300 p-2 rounded-md"
            value={age}
            onChange={(event) => setAge(event.target.value)}
          />

          <fieldset className="font-kanit">
            <legend>เพศ:</legend>
            <label className="mr-4">
              <input
                type="radio"
                name="gender"
                value="male"
                className="mr-1"
                checked={gender === "male"}
                onChange={(event) => setGender(event.target.value)}
              />
              ชาย
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                className="mr-1"
                checked={gender === "female"}
                onChange={(event) => setGender(event.target.value)}
              />
              หญิง
            </label>
          </fieldset>

          <div className="flex flex-col gap-3">
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md
                          mt-3 hover:bg-blue-700 cursor-pointer">
              คำนวณ
            </button>
            <button type="button" onClick={resetForm} className="bg-gray-300 text-black p-2 rounded-md
                          hover:bg-gray-700 hover:text-white cursor-pointer">
              รีเซ็ต
            </button>
          </div>
        </form>

        <div className="w-full flex justify-center items-center mt-2 font-kanit">
          <p>ค่า BMR ที่คำนวณได้:</p>
          <p className="text-xl font-bold text-blue-800 ml-2 font-kanit">{bmrValue.toFixed(2)}</p>
        </div>

        <Link to="/" className="w-full text-center bg-gray-300 hover:bg-gray-700 p-2
                                  rounded-md mt-5 font-kanit text-black">
          กลับไปหน้าหลัก
        </Link>
      </div>
    </>
  );
}
