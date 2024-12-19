import { FooterData } from "@/constant/mockdatas";
import React from "react";

const About = () => {
  return (
    <div className="w-full min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4 mt-20">Бидний тухай</h1>
        <p className="text-lg mb-6">
          <strong>LightHouse</strong> нь газар захиалга, худалдан авалтын
          үйлчилгээг орчин үеийн технологи ашиглан хялбаршуулах зорилготой.
          <strong className="pl-2">LightHouse</strong> компанийн албан ёсны
          вэбсайт юм.
        </p>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">Бидний эрхэм зорилго</h2>
          <p className="text-lg">
            Хэрэглэгчдэд чанартай, баталгаатай газар захиалгын үйлчилгээг
            онлайнаар хүргэх замаар цаг, хөдөлмөр хэмнэсэн шийдлийг санал
            болгоно.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">Бидний онцлог</h2>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li>
              Өргөн сонголттой газар: Хүссэн байршилдаа тохирсон газрыг
              онлайнаар хялбар хайх, захиалах боломж.
            </li>
            <li>
              Найдвартай үйлчилгээ: Манай вэбсайт дээрх бүх газрууд хууль ёсны
              баталгаатай.
            </li>
            <li>
              Хурдан шуурхай процесс: Захиалга хийхээс эхлээд гүйлгээний бүх үе
              шатыг түргэн шуурхай гүйцэтгэнэ.
            </li>
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">Бидний үнэт зүйлс</h2>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li>
              Харилцагч төвтэй үйлчилгээ: Хэрэглэгчдийн хүсэл, хэрэгцээг
              нэгдүгээрт тавьдаг.
            </li>
            <li>
              Итгэлцэл: Бид харилцагчдын итгэлийг хамгаалахын тулд бүх
              мэдээллийг ил тод, үнэн зөвөөр хүргэдэг.
            </li>
            <li>
              Дэвшилтэт технологи: Захиалгын процессыг хялбаршуулахын тулд
              хамгийн сүүлийн үеийн шийдлүүдийг ашигладаг.
            </li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-3">Холбоо барих</h2>
          <ul className="space-y-2 text-lg">
            <li>
              <strong>Имэйл:</strong>{" "}
              <a
                href="mailto:info@mstarlab.com"
                className="text-blue-500 hover:underline"
              >
                {FooterData.mail}
              </a>
            </li>
            <li>
              <strong>Утас:</strong> +976 {FooterData.phoneNumber}
            </li>
            <li>
              <strong>Хаяг:</strong> Улаанбаатар хот, Сүхбаатар дүүрэг, 1-р
              хороо, MStars Lab төв
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About;
