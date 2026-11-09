import { useState } from "react";
import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from "@/components/ui/Modal";

function Harness({ onClose }: { onClose?: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>abrir</button>
      <Modal
        open={open}
        onClose={() => {
          onClose?.();
          setOpen(false);
        }}
        labelledBy="t"
      >
        <h2 id="t">Título</h2>
        <button>primero</button>
        <button>último</button>
      </Modal>
    </>
  );
}

test("diálogo accesible, Escape cierra, bloquea scroll y devuelve el foco", async () => {
  const onClose = vi.fn();
  render(<Harness onClose={onClose} />);
  const opener = screen.getByText("abrir");
  await userEvent.click(opener);

  const dialog = screen.getByRole("dialog");
  expect(dialog).toHaveAttribute("aria-modal", "true");
  expect(dialog).toHaveAttribute("aria-labelledby", "t");
  expect(document.body.style.overflow).toBe("hidden");

  await userEvent.keyboard("{Escape}");
  expect(onClose).toHaveBeenCalledOnce();
  expect(document.body.style.overflow).toBe("");
  expect(opener).toHaveFocus();
});

test("Tab desde el último elemento vuelve al primero (foco atrapado)", async () => {
  render(<Harness />);
  await userEvent.click(screen.getByText("abrir"));
  screen.getByText("último").focus();
  await userEvent.tab();
  const focusables = screen.getByRole("dialog").querySelectorAll("button");
  expect(focusables[0]).toHaveFocus();
});
