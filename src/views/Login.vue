<template>
  <section>
    <img
      src="../assets/mosque.avif"
      class="absolute bg-cover h-full w-[300vh] blur-md -z-10"
      alt="Background Image/Mosque"
    />
    <div class="flex flex-col items-center justify-center px-6 mx-auto md:h-screen lg:py-0">
      <div
        class="w-[20%] h-[45%] bg-slate-800 opacity-70 dark:border md:mt-0 sm:max-w-md xl:py-5 dark:bg-slate-950 dark:border-slate-800"
      >
        <div class="flex flex-col justify-center items-center space-y-2 md:space-y-3 p-3">
          <i class="bx bx-user text-6xl border p-4 rounded-full"></i>
          <h1
            class="text-xl font-bold py-2 leading-tight text-center tracking-tight text-[#fff] md:text-2xl dark:text-white"
          >
            Welcome Ozodbek
          </h1>
          <form class="w-[85%] space-y-5 md:space-y-7" action="#">
            <div class="flex flex-col gap-4">
              <div class="flex flex-row items-center justify-center">
                <i class="bx bxs-user rounded-s-lg flex items-center dark:bg-slate-900 text-lg h-[42.5px] p-2.5"></i>
                <input
                  type="email"
                  name="email"
                  id="email"
                  class="outline-none rounded-e-lg border-slate-300 text-slate-900 focus:border-gray-500 w-full p-2.5 dark:bg-slate-900 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark: dark:focus:border-[#-gray-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div class="flex flex-row items-center justify-center">
                <i
                  class="bx bxs-lock rounded-s-lg dark:bg-slate-900 flex items-center text-lg h-[42.5px] p-2.5"
                  style="color: #ffffff"
                ></i>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="enter your password"
                  class="outline-none rounded-e-lg bg-slate-50  border-slate-300 text-slate-900 focus:border-gray-500 w-full p-2.5 dark:bg-slate-900 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark: dark:focus:border-[#F10086]"
                  required=""
                />
              </div>
            </div>

            <button
              type="submit"
              class="w-full text-white rounded-md bg-gray-700 hover:bg-gray-500 focus:outline-none font-medium text-sm px-5 py-3.5 text-center dark:bg-gray-700 dark:hover:bg-gray-500"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style lang="scss" scoped></style>
