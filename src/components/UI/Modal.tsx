import ReactModal from "react-modal";

function Modal({ isOpen, children, heading, closeHandler }: any) {
  ReactModal.setAppElement("#root");

  return (
    <ReactModal
      className="w-full lg:w-2/3 xl:w-1/2 items-center justify-center focus:outline-none gap-3"
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
          justifyContent: "center",
          zIndex: 10,
          margin: "auto",
          padding: "25px",
          background: "white",
          maxHeight: "90%",
          minHeight: "30%",
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
      <div className="flex w-full relative">
        <h1 className="text-lg underline mx-auto underline-offset-4 mb-2">
          {heading}
        </h1>
        <button
          className=" absolute font-black right-1 top-0 bg-gray-100 rounded-sm px-1 text-lg text-primary"
          onClick={() => closeHandler(false)}
        >
          X
        </button>
      </div>
      <div className="w-full overflow-y-auto">{children}</div>
    </ReactModal>
  );
}

export default Modal;
