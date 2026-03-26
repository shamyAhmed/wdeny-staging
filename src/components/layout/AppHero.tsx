import Image from "next/image";
import { FaApple, FaGooglePlay } from "react-icons/fa";

const AppHero = () => {
  return (
    <section className="app-hero text-center lg:text-start">
      <div className="container">
        <div className="app-hero__card">
          {/* Phone */}
          <div className="app-hero__phone hidden lg:flex absolute left-6 bottom-0">
            <Image
              src="/images/footer-app.png" // صورة الموبايل
              alt="App Preview"
              width={440}
              height={670}
              priority
            />
          </div>

          {/* Content */}
          <div className="app-hero__content mx-auto lg:mx-0">
            <h1 className="text-white">
              <span className="text-primary"> سفريتك </span>
              الجاية تبدأ من هنا{" "}
            </h1>

            <p>
              احجز تذكرتك للقطار، الباص، أو السيارة الخاصة خلال دقائق. خليك
              دايمًا جاهز لأي مشوار وسافر براحتك في كل مرة.
            </p>

            <div className="store-buttons">
              <a href="" className="btn google">
                <FaGooglePlay />
                متجر جوجل بلاي
              </a>

              <a href="" className="btn apple">
                <FaApple />
                متجر آبل
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppHero;
