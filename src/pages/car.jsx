import { useState } from "react";
import { Link } from "react-router";
import car from "./../assets/car.png";
import Swal from "sweetalert2";

export default function Car() {
  const [name, setName] = useState("");
  const [carPrice, setCarPrice] = useState("");
  const [annualInterest, setAnnualInterest] = useState("");
  const [downPaymentRate, setDownPaymentRate] = useState("15");
  const [termMonths, setTermMonths] = useState("24");
  const [result, setResult] = useState(null);

  function calculateInstallment(event) {
    event.preventDefault();

    if (carPrice === "" || annualInterest === "") {
      Swal.fire({
        title: "กรุณากรอกข้อมูลให้ครบ",
        text: "กรุณาป้อนราคารถและอัตราดอกเบี้ยต่อปี",
        icon: "warning",
      });
      return;
    }

    const price = Number(carPrice);
    const interestRate = Number(annualInterest);
    const months = Number(termMonths);
    const downPayment = Number(downPaymentRate);

    if (price <= 0 || interestRate < 0 || months <= 0) {
      Swal.fire({
        title: "ข้อมูลไม่ถูกต้อง",
        text: "ราคารถและจำนวนเดือนต้องมากกว่า 0 และดอกเบี้ยต้องไม่ติดลบ",
        icon: "warning",
      });
      return;
    }

    const downPaymentAmount = price * (downPayment / 100);
    const financedAmount = price - downPaymentAmount;
    const totalInterest = financedAmount * (interestRate / 100) * (months / 12);
    const totalPayment = financedAmount + totalInterest;

    setResult({
      downPaymentAmount,
      financedAmount,
      totalInterest,
      totalPayment,
      monthlyPayment: totalPayment / months,
    });
  }

  function resetForm() {
    setName("");
    setCarPrice("");
    setAnnualInterest("");
    setDownPaymentRate("15");
    setTermMonths("24");
    setResult(null);
  }

  return (
    <div className="w-[50%] border-1 border-gray-300 mt-30 mx-auto rounded-2xl
                    p-10 flex flex-col items-center gap-3 shadow-2xl">
      <h1 className="text-2xl font-bold text-blue-800">
        Car Installment Calculator
      </h1>
      <h3 className="text-xl text-gray-600">คำนวณ Car Installment</h3>
      <img src={car} alt="รถยนต์" className="w-32 h-32 object-contain" />

      <form className="w-full flex flex-col gap-3" onSubmit={calculateInstallment}>
        <label htmlFor="calculator-name" className="text-lg font-kanit">
          ชื่อผู้คำนวณ
        </label>
        <input
          id="calculator-name"
          type="text"
          placeholder="ชื่อผู้คำนวณ"
          className="border-1 border-gray-300 p-2 rounded-md"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <label htmlFor="car-price" className="text-lg font-kanit">
          ราคารถ (บาท)
        </label>
        <input
          id="car-price"
          type="number"
          min="1"
          placeholder="ราคารถ (บาท)"
          className="border-1 border-gray-300 p-2 rounded-md"
          value={carPrice}
          onChange={(event) => setCarPrice(event.target.value)}
        />

        <label htmlFor="car-interest" className="text-lg font-kanit">
          ดอกเบี้ยต่อปี (%)
        </label>
        <input
          id="car-interest"
          type="number"
          min="0"
          step="any"
          placeholder="ดอกเบี้ยต่อปี"
          className="border-1 border-gray-300 p-2 rounded-md"
          value={annualInterest}
          onChange={(event) => setAnnualInterest(event.target.value)}
        />

        <fieldset className="w-full font-kanit">
          <legend className="text-lg">เงินดาวน์ (%)</legend>
          <div className="flex w-full flex-nowrap items-center justify-between gap-4">
            {[15, 20, 25, 30, 35].map((rate) => (
              <label key={rate} className="flex items-center gap-1 whitespace-nowrap">
                <input
                  type="radio"
                  name="down-payment"
                  value={rate}
                  checked={downPaymentRate === String(rate)}
                  onChange={(event) => setDownPaymentRate(event.target.value)}
                />
                {rate}%
              </label>
            ))}
          </div>
        </fieldset>

        <label htmlFor="car-term" className="text-lg font-kanit">
          จำนวนเดือนที่ผ่อน
        </label>
        <select
          id="car-term"
          value={termMonths}
          onChange={(event) => setTermMonths(event.target.value)}
          className="border-1 border-gray-300 p-2 rounded-md"
        >
          <option value="24">24 เดือน</option>
          <option value="36">36 เดือน</option>
          <option value="48">48 เดือน</option>
          <option value="60">60 เดือน</option>
          <option value="72">72 เดือน</option>
          <option value="84">84 เดือน</option>
        </select>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-white p-2 rounded-md
                       mt-3 hover:bg-blue-700 cursor-pointer"
          >
            คำนวณ
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="flex-1 bg-gray-300 text-black p-2 rounded-md
                       mt-3 hover:bg-gray-700 hover:text-white cursor-pointer"
          >
            ล้างข้อมูล
          </button>
        </div>
      </form>

      {result && (
        <div className="w-full mt-2 flex flex-col gap-2 font-kanit">
          {name.trim() && <p>ชื่อผู้คำนวณ: {name.trim()}</p>}
          <p>เงินดาวน์ ({downPaymentRate}%): {result.downPaymentAmount.toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท</p>
          <p>ยอดจัดไฟแนนซ์: {result.financedAmount.toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท</p>
          <p>ดอกเบี้ยรวม: {result.totalInterest.toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท</p>
          <p>ยอดรวมที่ต้องผ่อน: {result.totalPayment.toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท</p>
          <p className="flex justify-center items-center">
            ผ่อนชำระต่อเดือน:
            <span className="text-xl font-bold text-blue-800 ml-2">
              {result.monthlyPayment.toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท
            </span>
          </p>
        </div>
      )}

      <Link
        to="/"
        className="w-full text-center bg-gray-300 hover:bg-gray-700 p-2
                   rounded-md mt-5 font-kanit text-black"
      >
        กลับหน้าหลัก
      </Link>
    </div>
  );
}
