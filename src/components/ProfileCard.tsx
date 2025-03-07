import imageUrl from '/profile.png';

export default function ProfileCard() {
  return (
    <section className="p-8 min-h-dvh relative grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
      <div className="space-y-4 ">
        <h1>Olá!</h1>
        <h2>
          Me chamo Silas Henrique, sou desenvolvedor front-end com mais de 4
          anos de experiência na criação de interfaces web modernas e
          responsivas.
        </h2>
        <p>
          Tenho foco em performance, usabilidade e boas práticas de
          desenvolvimento. Atualmente, trabalho com{' '}
          <span className="bg-lime-300 dark:bg-yellow-300 dark:text-gray-900 px-1">
            React , Next.js e TypeScript
          </span>
          , construindo soluções escaláveis e integradas com APIs REST.
        </p>
        <p>
          Além disso, sou um grande fã de design e estou sempre estudando e
          praticando para melhorar minhas habilidades nessa área.
        </p>
        <p>
          Se você gostou do meu trabalho e quer entrar em contato, sinta-se à
          vontade para me enviar uma mensagem no meu{' '}
          <a
            className="text-blue-500 hover:underline"
            href="mailto:silash.silva00@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            E-Mail
          </a>{' '}
          ou no{' '}
          <a
            className="text-blue-500 hover:underline"
            href="
          https://www.linkedin.com/in/silashenrique/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </p>
      </div>
      <div className="flex justify-center">
        <img
          className="rounded-lg aspect-auto w-64"
          src={imageUrl}
          alt="Silas Henrique
        "
        />
      </div>
    </section>
  );
}
