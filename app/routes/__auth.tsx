import { Outlet } from '@remix-run/react'

export default function AuthLayout() {
  return (
    <div className="flex flex-1">
      <div className="flex flex-1 items-center">
        <div className="flex flex-1 items-center justify-center p-6">
          <div className="w-full max-w-xs text-center">
            <Outlet />
          </div>
        </div>
      </div>
      {/* Images */}
      <div className="relative hidden flex-1 items-center justify-center overflow-hidden border-l-2 border-black bg-pink-300 md:block">
        <div className="w-full ">
          <div className="mt-10">
            <div
              aria-hidden="true"
              className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-6xl"
            >
              <div className="absolute top-1/2 -translate-y-1/2 rotate-12 sm:translate-x-8 lg:translate-x-6">
                <div className="flex items-center space-x-6 lg:space-x-12">
                  <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-12">
                    <div className="h-96 w-56 overflow-hidden rounded-lg border border-black shadow-flat">
                      <img
                        alt="Recipe"
                        src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'/%3E"
                        srcSet="/burger.png 768w,
                                data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'/%3E 1w"
                        sizes="(min-width: 768px) 224px,
                               (max-width: 767px) 1px"
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="h-96 w-56 overflow-hidden rounded-lg border border-black shadow-flat">
                      <img
                        alt="Recipe"
                        src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'/%3E"
                        srcSet="/burger.png 768w,
                                data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'/%3E 1w"
                        sizes="(min-width: 768px) 224px,
                               (max-width: 767px) 1px"
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>
                  <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-12">
                    <div className="h-96 w-56 overflow-hidden rounded-lg border border-black shadow-flat">
                      <img
                        alt="Recipe"
                        src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'/%3E"
                        srcSet="/burger.png 768w,
                                data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'/%3E 1w"
                        sizes="(min-width: 768px) 224px,
                               (max-width: 767px) 1px"
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="h-96 w-56 overflow-hidden rounded-lg border border-black shadow-flat">
                      <img
                        alt="Recipe"
                        src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'/%3E"
                        srcSet="/burger.png 768w,
                                data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'/%3E 1w"
                        sizes="(min-width: 768px) 224px,
                               (max-width: 767px) 1px"
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="h-96 w-56 overflow-hidden rounded-lg border border-black shadow-flat">
                      <img
                        alt="Recipe"
                        src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'/%3E"
                        srcSet="/burger.png 768w,
                                data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'/%3E 1w"
                        sizes="(min-width: 768px) 224px,
                               (max-width: 767px) 1px"
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>
                  <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                    <div className="h-96 w-56 overflow-hidden rounded-lg border border-black shadow-flat">
                      <img
                        alt="Recipe"
                        src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'/%3E"
                        srcSet="/burger.png 768w,
                                data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'/%3E 1w"
                        sizes="(min-width: 768px) 224px,
                               (max-width: 767px) 1px"
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="h-96 w-56 overflow-hidden rounded-lg border border-black shadow-flat">
                      <img
                        alt="Recipe"
                        src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'/%3E"
                        srcSet="/burger.png 768w,
                                data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'/%3E 1w"
                        sizes="(min-width: 768px) 224px,
                               (max-width: 767px) 1px"
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>
                  <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                    <div className="h-96 w-56 overflow-hidden rounded-lg border border-black shadow-flat">
                      <img
                        alt="Recipe"
                        src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'/%3E"
                        srcSet="/burger.png 768w,
                                data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'/%3E 1w"
                        sizes="(min-width: 768px) 224px,
                               (max-width: 767px) 1px"
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
