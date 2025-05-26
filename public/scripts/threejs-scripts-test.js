const preload = () => {
    let manager = new THREE.LoadingManager()
    manager.onLoad = function () {
        new Environment(particle)
    }

    const particle = new THREE.TextureLoader(manager).load(
        "https://res.cloudinary.com/dfvtkoboz/image/upload/v1605013866/particle_a64uzf.png"
    )
}

if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
)
    preload()
else document.addEventListener("DOMContentLoaded", preload)

class Environment {
    constructor(particle) {
        this.particle = particle
        this.container = document.querySelector("#magic")
        this.scene = new THREE.Scene()
        this.createCamera()
        this.createRenderer()
        this.setup()
        this.bindEvents()
    }

    bindEvents() {
        window.addEventListener("resize", this.onWindowResize.bind(this))
    }

    setup() {
        this.createParticles = new CreateParticles(
            this.scene,
            this.particle,
            this.camera,
            this.renderer
        )
    }

    render() {
        this.createParticles.render()
        this.renderer.render(this.scene, this.camera)
    }

    createCamera() {
        this.camera = new THREE.PerspectiveCamera(65, 12 / 16, 1, 10000)
        // this.camera = new THREE.PerspectiveCamera(
        //     65,
        //     this.container.clientWidth / this.container.clientHeight,
        //     1,
        //     10000
        // )
        this.camera.position.set(0, 0, 600)
    }

    createRenderer() {
        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setSize(
            this.container.clientWidth,
            this.container.clientHeight
        )

        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        this.renderer.outputEncoding = THREE.sRGBEncoding
        this.container.appendChild(this.renderer.domElement)

        const loop = () => {
            if (this.createParticles && this.createParticles.particles) {
                this.render()
            }
            requestAnimationFrame(loop)
        }
        loop()
    }

    onWindowResize() {
        this.camera.aspect =
            this.container.clientWidth / this.container.clientHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(
            this.container.clientWidth,
            this.container.clientHeight
        )
    }
}

class CreateParticles {
    constructor(scene, particleImg, camera, renderer) {
        this.scene = scene
        this.particleImg = particleImg
        this.camera = camera
        this.renderer = renderer

        this.raycaster = new THREE.Raycaster()
        this.mouse = new THREE.Vector2(-200, 200)

        this.colorChange = new THREE.Color()

        this.buttom = false

        this.data = {
            amount: 1500,
            particleSize: 1,
            particleColor: 0xffffff,
            area: 10000,
            ease: 0.05,
        }

        this.setup()
        this.bindEvents()
    }

    setup() {
        const geometry = new THREE.PlaneGeometry(
            this.visibleWidthAtZDepth(100, this.camera),
            this.visibleHeightAtZDepth(100, this.camera)
        )
        const material = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            transparent: true,
        })
        this.planeArea = new THREE.Mesh(geometry, material)
        this.planeArea.visible = false
        this.createImageParticles("/images/deheus-logo-slogan.png", 1.0, 100)
    }

    bindEvents() {
        document.addEventListener("mousedown", this.onMouseDown.bind(this))
        document.addEventListener("mousemove", this.onMouseMove.bind(this))
        document.addEventListener("mouseup", this.onMouseUp.bind(this))
    }

    onMouseDown() {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

        const vector = new THREE.Vector3(this.mouse.x, this.mouse.y, 0.5)
        vector.unproject(this.camera)
        const dir = vector.sub(this.camera.position).normalize()
        const distance = -this.camera.position.z / dir.z
        this.currenPosition = this.camera.position
            .clone()
            .add(dir.multiplyScalar(distance))

        this.buttom = true
        this.data.ease = 0.01
    }

    onMouseUp() {
        this.buttom = false
        this.data.ease = 0.05
    }

    onMouseMove() {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    render() {
        if (!this.particles || !this.geometryCopy) return

        const time = ((0.001 * performance.now()) % 12) / 12
        const zigzagTime = (1 + Math.sin(time * 2 * Math.PI)) / 6

        this.raycaster.setFromCamera(this.mouse, this.camera)

        const intersects = this.raycaster.intersectObject(this.planeArea)

        if (intersects.length > 0) {
            const pos = this.particles.geometry.attributes.position
            const copy = this.geometryCopy.attributes.position
            const coulors = this.particles.geometry.attributes.customColor
            const size = this.particles.geometry.attributes.size

            const mx = intersects[0].point.x
            const my = intersects[0].point.y

            for (var i = 0, l = pos.count; i < l; i++) {
                const initX = copy.getX(i)
                const initY = copy.getY(i)
                const initZ = copy.getZ(i)

                let px = pos.getX(i)
                let py = pos.getY(i)
                let pz = pos.getZ(i)

                this.colorChange.setHSL(0.5, 1, 1)
                coulors.setXYZ(
                    i,
                    this.colorChange.r,
                    this.colorChange.g,
                    this.colorChange.b
                )
                coulors.needsUpdate = true

                size.array[i] = this.data.particleSize
                size.needsUpdate = true

                let dx = mx - px
                let dy = my - py

                const mouseDistance = this.distance(mx, my, px, py)
                let d = (dx = mx - px) * dx + (dy = my - py) * dy
                const f = -this.data.area / d

                if (this.buttom) {
                    const t = Math.atan2(dy, dx)
                    px -= f * Math.cos(t)
                    py -= f * Math.sin(t)

                    this.colorChange.setHSL(0.5 + zigzagTime, 1.0, 0.5)
                    coulors.setXYZ(
                        i,
                        this.colorChange.r,
                        this.colorChange.g,
                        this.colorChange.b
                    )
                    coulors.needsUpdate = true

                    if (
                        px > initX + 70 ||
                        px < initX - 70 ||
                        py > initY + 70 ||
                        py < initY - 70
                    ) {
                        this.colorChange.setHSL(0.15, 1.0, 0.5)
                        coulors.setXYZ(
                            i,
                            this.colorChange.r,
                            this.colorChange.g,
                            this.colorChange.b
                        )
                        coulors.needsUpdate = true
                    }
                } else {
                    if (mouseDistance < this.data.area) {
                        if (i % 5 == 0) {
                            const t = Math.atan2(dy, dx)
                            px -= 0.03 * Math.cos(t)
                            py -= 0.03 * Math.sin(t)

                            this.colorChange.setHSL(0.15, 1.0, 0.5)
                            coulors.setXYZ(
                                i,
                                this.colorChange.r,
                                this.colorChange.g,
                                this.colorChange.b
                            )
                            coulors.needsUpdate = true

                            size.array[i] = this.data.particleSize / 1.2
                            size.needsUpdate = true
                        } else {
                            const t = Math.atan2(dy, dx)
                            px += f * Math.cos(t)
                            py += f * Math.sin(t)

                            pos.setXYZ(i, px, py, pz)
                            pos.needsUpdate = true

                            size.array[i] = this.data.particleSize * 1.3
                            size.needsUpdate = true
                        }

                        if (
                            px > initX + 10 ||
                            px < initX - 10 ||
                            py > initY + 10 ||
                            py < initY - 10
                        ) {
                            this.colorChange.setHSL(0.15, 1.0, 0.5)
                            coulors.setXYZ(
                                i,
                                this.colorChange.r,
                                this.colorChange.g,
                                this.colorChange.b
                            )
                            coulors.needsUpdate = true

                            size.array[i] = this.data.particleSize / 1.8
                            size.needsUpdate = true
                        }
                    }
                }

                px += (initX - px) * this.data.ease
                py += (initY - py) * this.data.ease
                pz += (initZ - pz) * this.data.ease

                pos.setXYZ(i, px, py, pz)
                pos.needsUpdate = true
            }
        }
    }

    createImageParticles(imageUrl, scale = 1.0, alphaThreshold = 100) {
        const img = new Image()
        img.crossOrigin = "Anonymous"
        img.src = imageUrl

        img.onload = () => {
            const canvas = document.createElement("canvas")
            const ctx = canvas.getContext("2d")

            canvas.width = img.width * scale
            canvas.height = img.height * scale
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

            const imageData = ctx.getImageData(
                0,
                0,
                canvas.width,
                canvas.height
            )
            const pixels = imageData.data

            const points = []
            const colors = []
            const sizes = []

            // Loop through image pixels, skipping borders
            for (let y = 1; y < canvas.height - 1; y++) {
                for (let x = 1; x < canvas.width - 1; x++) {
                    const i = (y * canvas.width + x) * 4
                    const alpha = pixels[i + 3]

                    if (alpha > alphaThreshold) {
                        const getAlphaAt = (xx, yy) =>
                            pixels[(yy * canvas.width + xx) * 4 + 3]
                        const neighbors = [
                            getAlphaAt(x - 1, y),
                            getAlphaAt(x + 1, y),
                            getAlphaAt(x, y - 1),
                            getAlphaAt(x, y + 1),
                        ]
                        const isEdge = neighbors.some((a) => a < alphaThreshold)
                        if (!isEdge) continue

                        // Add the main particle
                        const px = x - canvas.width / 2
                        const py = -y + canvas.height / 2
                        points.push(new THREE.Vector3(px, py, 0))
                        colors.push(1.0, 1.0, 1.0)
                        sizes.push(2.0)

                        // Add surrounding particles to thicken the outline
                        const offsets = [
                            [-1, 0],
                            [1, 0],
                            [0, -1],
                            [0, 1], // 4-neighbors
                            [-1, -1],
                            [-1, 1],
                            [1, -1],
                            [1, 1], // diagonals (optional)
                        ]

                        offsets.forEach(([dx, dy]) => {
                            const nx = x + dx
                            const ny = y + dy
                            const neighborAlpha = getAlphaAt(nx, ny)
                            if (neighborAlpha > alphaThreshold) {
                                const npx = nx - canvas.width / 2
                                const npy = -ny + canvas.height / 2
                                points.push(new THREE.Vector3(npx, npy, 0))
                                colors.push(1.0, 1.0, 1.0)
                                sizes.push(2.0)
                            }
                        })
                    }
                }
            }

            const geometry = new THREE.BufferGeometry().setFromPoints(points)
            geometry.setAttribute(
                "customColor",
                new THREE.Float32BufferAttribute(colors, 3)
            )
            geometry.setAttribute(
                "size",
                new THREE.Float32BufferAttribute(sizes, 1)
            )

            const material = new THREE.ShaderMaterial({
                uniforms: {
                    color: { value: new THREE.Color(0xffffff) },
                    pointTexture: { value: this.particleImg },
                },
                vertexShader:
                    document.getElementById("vertexshader").textContent,
                fragmentShader:
                    document.getElementById("fragmentshader").textContent,
                blending: THREE.AdditiveBlending,
                depthTest: false,
                transparent: true,
            })

            this.particles = new THREE.Points(geometry, material)
            this.scene.add(this.particles)

            // Store copy for interactive update logic
            this.geometryCopy = new THREE.BufferGeometry()
            this.geometryCopy.copy(this.particles.geometry)
        }
    }

    visibleHeightAtZDepth(depth, camera) {
        const cameraOffset = camera.position.z
        if (depth < cameraOffset) depth -= cameraOffset
        else depth += cameraOffset

        const vFOV = (camera.fov * Math.PI) / 180

        return 2 * Math.tan(vFOV / 2) * Math.abs(depth)
    }

    visibleWidthAtZDepth(depth, camera) {
        const height = this.visibleHeightAtZDepth(depth, camera)
        return height * camera.aspect
    }

    distance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
    }
}
