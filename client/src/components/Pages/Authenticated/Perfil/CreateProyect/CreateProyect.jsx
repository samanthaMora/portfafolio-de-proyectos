import { useFormProyect } from "./useFormProyect";
import ProyectForm from "./ProyectForm";

export default function CreateProyect() {
  const formProps = useFormProyect();
  return <ProyectForm {...formProps} />;
}
