import { Layout } from "./_components/layout";
import Form from "./_components/form/form";

export default function Page() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold text-orange-500 mb-6">Iniciar Sesión</h1>
      <Form />
    </Layout>
  );
}
