


    return (
    <main className="flex justify-center items-center h-screen bg-gray-500">
      <div className="relative md:mt-40 lg:mt-20 sm:w-[528px] sm:h-[396px] lg:w-[792px] lg:h-[594px] 2xl:w-[1055px] 2xl:h-[791px] bg-quadroBadges bg-cover bg-no-repeat bg-center">
        {/* Grid overlay */}
        <div className="absolute top-0 left-0 w-full h-full grid grid-cols-4 grid-rows-2 gap-5 p-20">
          {/* Grid items */}
          <div className="relative bg-red-500/50 flex justify-center items-center">
            <div className="bg-[url('/path/to/background-image.jpg')] bg-cover bg-center bg-no-repeat w-full h-full absolute top-0 left-0 opacity-75"></div>
            <div className="z-10 text-center w-[50%]">
              <p className="text-white font-bold">Arte</p>
              <Progress value={progress || 0} />
            </div>
          </div>
          <div className="bg-blue-500/50 flex justify-center items-center">
            <div className="bg-[url('/path/to/background-image.jpg')] bg-cover bg-center bg-no-repeat w-full h-full absolute top-0 left-0 opacity-75"></div>
            <div className="z-10 text-center w-[50%]">
              <p className="text-white font-bold">Design</p>
              <Progress value={progress || 0} />
            </div>
          </div>
          <div className="bg-green-500/50 flex justify-center items-center">
            <div className="bg-[url('/path/to/background-image.jpg')] bg-cover bg-center bg-no-repeat w-full h-full absolute top-0 left-0 opacity-75"></div>
            <div className="z-10 text-center w-[50%]">
              <p className="text-white font-bold">Tecnologia</p>
              <Progress value={progress || 0} />
            </div>
          </div>
          <div className="bg-yellow-500/50 flex justify-center items-center">
            <div className="bg-[url('/path/to/background-image.jpg')] bg-cover bg-center bg-no-repeat w-full h-full absolute top-0 left-0 opacity-75"></div>
            <div className="z-10 text-center w-[50%]">
              <p className="text-white font-bold">Comunicação</p>
              <Progress value={progress || 0} />
            </div>
          </div>
          <div className="bg-purple-500/50 flex justify-center items-center">
            <div className="bg-[url('/path/to/background-image.jpg')] bg-cover bg-center bg-no-repeat w-full h-full absolute top-0 left-0 opacity-75"></div>
            <div className="z-10 text-center w-[50%]">
              <p className="text-white font-bold">Hipermédia</p>
              <Progress value={progress || 0} />
            </div>
          </div>
          <div className="bg-pink-500/50 flex justify-center items-center">
            <div className="bg-[url('/path/to/background-image.jpg')] bg-cover bg-center bg-no-repeat w-full h-full absolute top-0 left-0 opacity-75"></div>
            <div className="z-10 text-center w-[50%]">
              <p className="text-white font-bold">Multiverso</p>
              <Progress value={progress || 0} />
            </div>
          </div>
          <div className="bg-teal-500/50 flex justify-center items-center">
            <div className="bg-[url('/path/to/background-image.jpg')] bg-cover bg-center bg-no-repeat w-full h-full absolute top-0 left-0 opacity-75"></div>
            <div className="z-10 text-center w-[50%]">
              <p className="text-white font-bold">Jogo</p>
              <Progress value={progress || 0} />
            </div>
          </div>
          <div className="bg-orange-500/50 flex justify-center items-center">
            <div className="bg-[url('/path/to/background-image.jpg')] bg-cover bg-center bg-no-repeat w-full h-full absolute top-0 left-0 opacity-75"></div>
            <div className="z-10 text-center w-[50%]">
              <p className="text-white font-bold">Inteligência Artifical</p>
              <Progress value={progress || 0} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )