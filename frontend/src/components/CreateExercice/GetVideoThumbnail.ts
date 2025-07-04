export const getVideoThumbnail = (
    file: File,
    captureTimeInSeconds = 1
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video")
      const canvas = document.createElement("canvas")
      const url = URL.createObjectURL(file)
  
      video.src = url
      video.crossOrigin = "anonymous"
      video.preload = "metadata"
      video.muted = true
      video.playsInline = true
  
      video.addEventListener("loadedmetadata", () => {
        if (captureTimeInSeconds > video.duration) {
          captureTimeInSeconds = 0
        }
        video.currentTime = captureTimeInSeconds
      })
  
      video.addEventListener("seeked", () => {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
  
        const ctx = canvas.getContext("2d")
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
          const imageDataUrl = canvas.toDataURL("image/jpeg", 0.8) // 👈 miniature en JPEG
          resolve(imageDataUrl)
        } else {
          reject(new Error("Impossible de dessiner sur le canvas."))
        }
  
        URL.revokeObjectURL(url)
      })
  
      video.addEventListener("error", () => {
        reject(new Error("Erreur de chargement vidéo."))
      })
    })
  }
  