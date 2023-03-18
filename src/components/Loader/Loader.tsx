export function Loader (props: { shown: boolean }) {
  return (<div className={`${props.shown ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} bg-[#00000095] w-screen h-screen fixed inset-0 z-50 flex flex-row items-center justify-center backdrop-blur-xl`}>
    <span>Loading ...</span>
  </div>)
}