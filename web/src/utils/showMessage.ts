export function showMessage(
  ref: React.MutableRefObject<HTMLSpanElement | undefined>,
  message: string,
  type: "success" | "error"
) {
  if (!ref.current) return;

  ref.current.innerHTML = message;

  ref.current.classList.remove("success");
  ref.current.classList.remove("error");
  ref.current.classList.add(type);

  ref.current.style.display = "block";
}
