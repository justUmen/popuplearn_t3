import { GetStaticProps } from "next";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

export interface PUL {
  id: number;
  name: string;
  introduction: string;
  sentence: string;
  subject: string;
  pul_elements: PulElement[];
}

export interface PulElement {
  id: number;
  question: string;
  answer: string;
  details: PulDetail[];
}

export interface PulDetail {
  id: number;
  description: string;
}

interface Props {
  pULs: PUL[];
}

export default function Pul({ pULs }: Props) {
  return (
    <div>
      <ul>
        {pULs.map((pul) => (
          <li key={pul.id}>
            <Link href={`/pul/${pul.name}`}>
              <h2>Name : {pul.name}</h2>
            </Link>
            <p>introduction : {pul.introduction}</p>
            <p>sentence : {pul.sentence}</p>
            <p>subject : {pul.subject}</p>
            {/* <table>
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Answer</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {pul.pul_elements.map((element) => (
                  <tr key={element.id}>
                    <td>{element.question}</td>
                    <td>{element.answer}</td>
                    <td>
                      {element.details.map((detail) => (
                        <p key={detail.id}>{detail.description}</p>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps = async () => {
  //SSG - Static Site Generation
  const prisma = new PrismaClient();
  const pULs = await prisma.pUL.findMany();
  return { props: { pULs } };
};
