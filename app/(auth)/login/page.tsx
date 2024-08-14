import { Layout } from "./_components/layout";
import Form from "./_components/form/form";

export default function Page() {
  return (
    <Layout>
      <Layout.Header>
        <h1 className="flex text-black justify-center items-center gap-x-2 text-lg">
          Iniciar sesión en su cuenta
        </h1>
      </Layout.Header>

      <Layout.Form>
        <Form />
      </Layout.Form>

    </Layout>
  );
}
