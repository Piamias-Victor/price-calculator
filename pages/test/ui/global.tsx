import { Button } from "@/libs/ui/button";
import { Input } from "@/libs/ui/input";
import { Textarea } from "@/libs/ui/textarea";

export default function TestUI() {
    return <>
      <Button.Contrast.Test />
      <Button.Gradient.Test />
      <Button.Base.Test />
      <Button.Opposite.Test />
      <Input.Bordered.Test />
      <Input.Contrast.Test />
      <Input.Naked.Test />
      <Textarea.Contrast.Test />
  </>
}