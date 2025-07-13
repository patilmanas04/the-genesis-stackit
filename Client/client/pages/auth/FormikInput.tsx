import { useField } from "formik";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormikInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
}

export function FormikInput({ label, className, ...props }: FormikInputProps) {
  const [field, meta] = useField(props.name);

  return (
    <div className="space-y-1">
      <Label htmlFor={props.name}>{label}</Label>
      <Input id={props.name} {...field} {...props} className={className} />
      {meta.touched && meta.error ? (
        <p className="text-xs text-red-600 mt-1">{meta.error}</p>
      ) : null}
    </div>
  );
}
