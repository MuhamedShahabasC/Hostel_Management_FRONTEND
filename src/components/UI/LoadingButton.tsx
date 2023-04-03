function LoadingButton() {
  return (
    <button
      type="button"
      className={`bg-primary text-white text-center rounded-md p-2 tracking-wider flex justify-center`}
    >
      <img
        className="animate-spin h-6 w-6"
        src="https://res.cloudinary.com/dqrnskj2b/image/upload/v1680533902/Hostel%20Management%20Project/UI/icons/loading_altasp.png"
        alt="loadingButton"
      />
    </button>
  );
}

export default LoadingButton;
