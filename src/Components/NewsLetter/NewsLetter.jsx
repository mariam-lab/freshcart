export default function NewsLetter() {
  return (
    <>
      <div className="bg-primary-50 w-full  py-12 flex flex-col gap-8 items-center">
        <h3 className="text-4xl font-bold">Subscribe to our Newsletter</h3>
        <p className="text-lg font-extralight text-gray-500">
          Stay updated with our latest offers, recipes, and health tips.
        </p>
        <div className="flex w-full items-center justify-center ">
          <input
            type="email"
            placeholder="Your email address"
            className="form-control w-1/3 "
          />
          <button className="btn bg-primary-600  text-white">Subscribe</button>
        </div>
      </div>
    </>
  );
}
