import ReactModal from "react-modal";
import Button from "./Button";

function Modal({ isOpen, children, heading, closeHandler }: any) {
  ReactModal.setAppElement("#root");

  return (
    <ReactModal
      className="w-full xl:w-6/12 items-center justify-center focus:outline-none gap-3"
      isOpen={isOpen}
      style={{
        overlay: {
          zIndex: 10,
          background: "rgb(0, 0, 0,0.5)",
          display: "flex",
        },
        content: {
          display: "flex",
          borderRadius: "8px",
          flexDirection: "column",
          zIndex: 10,
          margin: "auto",
          padding: "25px",
          background: "white",
          maxHeight: "80%",
        },
      }}
      contentLabel={"Example Modal"}
      bodyOpenClassName={"ReactModal__Body--open"}
      htmlOpenClassName={"ReactModal__Html--open"}
      ariaHideApp={true}
      shouldFocusAfterRender={true}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      shouldReturnFocusAfterClose={true}
      role={"dialog"}
      preventScroll={true}
      parentSelector={() => document.body}
      aria={{
        labelledby: "heading",
        describedby: "full_description",
      }}
      overlayElement={(props, contentElement) => (
        <div {...props}>{contentElement}</div>
      )}
      contentElement={(props, children) => <div {...props}>{children}</div>}
    >
      <h1 className="text-lg">{heading}</h1>
      <div className="overflow-y-auto">{children}</div>
      <span className="text-sm">
        <Button type="button" onClick={() => closeHandler(false)}>
          Close
        </Button>
      </span>
    </ReactModal>
  );
}

export default Modal;
