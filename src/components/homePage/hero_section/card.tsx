"use client"

import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
} from "react"
import gsap from "gsap"

export interface CardSwapProps {
  width?: number | string
  height?: number | string
  cardDistance?: number
  verticalDistance?: number
  delay?: number
  pauseOnHover?: boolean
  onCardClick?: (idx: number) => void
  skewAmount?: number
  easing?: "linear" | "elastic"
  children: ReactNode
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string
  language?: "java" | "cpp" | "python"
  title?: string
  code?: string
}

// Built-in content data
interface HeroContent {
  title: {
    prefix: string
    animated: string
  }
}

interface CodeCard {
  id: number
  language: "java" | "cpp" | "python"
  title: string
  content: string
}

export const heroContent: HeroContent = {
  title: {
    prefix: "Master",
    animated: "Algorithms",
  },
}

export const codeCards: CodeCard[] = [
  {
    id: 1,
    language: "python",
    title: "CodeCompass",
    content: `# CodeCompass Search 🧭
def find(arr, x):
    l, r = 0, len(arr) - 1
    while l <= r:
        m = (l + r) // 2
        if arr[m] == x: return m
        elif arr[m] < x: l = m + 1
        else: r = m - 1
    return -1

# Usage
nums = [1, 5, 9, 13]
print(find(nums, 9))  # 2`,
  },
  {
    id: 2,
    language: "java",
    title: "CodeCompass",
    content: `// CodeCompass Sort ⚡
class CodeCompass {
    static void sort(int[] a, int l, int h) {
        if (l < h) {
            int p = part(a, l, h);
            sort(a, l, p-1); sort(a, p+1, h);
        }}
    static int part(int[] a, int l, int h) {
        int p = a[h], i = l-1;
        for (int j = l; j < h; j++)
            if (a[j] <= p) swap(a, ++i, j);
        swap(a, i+1, h); return i+1;
    }
    static void swap(int[] a, int i, int j) {
        int t=a[i]; a[i]=a[j]; a[j]=t; }}`,
  },
  {
    id: 3,
    language: "cpp",
    title: "CodeCompass",
    content: `// CodeCompass Path 🗺️
#include <vector>
#include <queue>
class CodeCompass {
public:
    vector<int> path(int n, auto& g, int s) {
        vector<int> d(n, 1e9);
        priority_queue<pair<int,int>> pq;
        d[s] = 0; pq.push({0, s});
        while (!pq.empty()) {
            auto [dist, u] = pq.top(); pq.pop();
            for (auto [v, w] : g[u])
                if (d[u] + w < d[v])
                    d[v] = d[u] + w, pq.push({-d[v],v});
        } return d;}};`,
  },
]

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ customClass, language, title, code, children, ...rest }, ref) => {
    const getLanguagesStyle = (lang?: string) => {
      switch (lang) {
        case "java":
          return {
            gradient: "from-orange-500/20 via-red-500/15 to-yellow-500/20",
            border: "border-orange-400/30",
            accent: "text-orange-400",
            bgPattern: "bg-gradient-to-br from-orange-500/10 to-red-500/10",
            shadowColor: "#fb923c",
            glassEffect: "backdrop-blur-3xl bg-white/5 dark:bg-black/10 border-white/20 dark:border-white/10",
          }
        case "cpp":
          return {
            gradient: "from-blue-500/20 via-indigo-500/15 to-cyan-500/20",
            border: "border-blue-400/30",
            accent: "text-blue-400",
            bgPattern: "bg-gradient-to-br from-blue-500/10 to-indigo-500/10",
            shadowColor: "#60a5fa",
            glassEffect: "backdrop-blur-3xl bg-white/5 dark:bg-black/10 border-white/20 dark:border-white/10",
          }
        case "python":
          return {
            gradient: "from-green-500/20 via-emerald-500/15 to-teal-500/20",
            border: "border-green-400/30",
            accent: "text-green-400",
            bgPattern: "bg-gradient-to-br from-green-500/10 to-emerald-500/10",
            shadowColor: "#22c55e",
            glassEffect: "backdrop-blur-3xl bg-white/5 dark:bg-black/10 border-white/20 dark:border-white/10",
          }
        default:
          return {
            gradient: "from-gray-500/20 via-slate-500/15 to-zinc-500/20",
            border: "border-gray-400/30",
            accent: "text-gray-400",
            bgPattern: "bg-gradient-to-br from-gray-500/10 to-slate-500/10",
            shadowColor: "#94a3b8",
            glassEffect: "backdrop-blur-3xl bg-white/5 dark:bg-black/10 border-white/20 dark:border-white/10",
          }
      }
    }

    const langStyle = getLanguagesStyle(language)

    // Syntax highlighting function with theme support
    const highlightCode = (code: string, lang?: string) => {
      if (!code) return code

      let highlighted = code

      // Keywords by language
      const keywords = {
        java: [
          "public",
          "class",
          "private",
          "void",
          "int",
          "boolean",
          "if",
          "else",
          "return",
          "new",
          "null",
          "static",
          "for",
          "while",
        ],
        cpp: [
          "#include",
          "class",
          "public",
          "private",
          "void",
          "int",
          "vector",
          "std",
          "using",
          "namespace",
          "if",
          "else",
          "return",
          "for",
          "while",
          "auto",
        ],
        python: [
          "def",
          "if",
          "else",
          "elif",
          "return",
          "for",
          "in",
          "enumerate",
          "True",
          "False",
          "None",
          "while",
          "len",
          "print",
        ],
      }

      const langKeywords = keywords[lang as keyof typeof keywords] || []

      // Apply syntax highlighting - keywords will be styled with Tailwind classes
      langKeywords.forEach((keyword) => {
        const regex = new RegExp(`\\b${keyword}\\b`, "g")
        highlighted = highlighted.replace(
          regex,
          `<span class="text-rose-500 dark:text-rose-400 font-bold">${keyword}</span>`
        )
      })

      return highlighted
    }

    return (
      <div
        ref={ref}
        {...rest}
        className={`
          ${langStyle.glassEffect}
          border ${langStyle.border}
          absolute top-1/2 left-1/2 rounded-2xl 
          transition-all duration-500 ease-out
          [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden]
          hover:scale-[1.02] cursor-pointer
          overflow-hidden group
          shadow-2xl shadow-black/20 dark:shadow-black/40
          hover:shadow-3xl hover:shadow-black/30 dark:hover:shadow-black/50
          w-[400px] h-[300px] sm:w-[450px] sm:h-[350px] md:w-[500px] md:h-[400px]
          ${customClass ?? ""} 
          ${rest.className ?? ""}
        `.trim()}
        style={{
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${langStyle.gradient} opacity-40 group-hover:opacity-60 transition-opacity duration-500`}
        />

        <div
          className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
          }}
        />

        <div className="flex items-center justify-between px-4 py-3 border-b border-white/20 dark:border-white/10 bg-black/10 dark:bg-black/20 backdrop-blur-xl relative z-10">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/90 shadow-sm"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/90 shadow-sm"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/90 shadow-sm"></div>
            </div>
            {title && (
              <span className={`text-sm font-mono ml-2 ${langStyle.accent} font-medium drop-shadow-sm`}>
                {title}.{language}
              </span>
            )}
          </div>
          {language && (
            <div className="flex items-center gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-white/20 dark:bg-white/10 text-gray-800 dark:text-white/90 uppercase font-mono font-medium border border-white/30 dark:border-white/20 backdrop-blur-sm">
                {language === "cpp" ? "C++" : language}
              </span>
            </div>
          )}
        </div>

        <div className="flex h-[calc(100%-50px)] relative z-10">
          <div className="w-12 bg-black/5 dark:bg-black/10 border-r border-white/20 dark:border-white/10 flex flex-col text-gray-600 dark:text-white/60 text-xs font-mono backdrop-blur-sm">
            {code &&
              code.split("\n").map((_, index) => (
                <div
                  key={index}
                  className="px-2 py-0.5 text-right leading-5 hover:text-gray-900 dark:hover:text-white/80 transition-colors"
                >
                  {index + 1}
                </div>
              ))}
          </div>

          <div className="flex-1 relative overflow-hidden">
            {code ? (
              <div className="relative z-10 p-4 h-full overflow-auto">
                <pre className="text-xs sm:text-sm font-mono leading-5 text-gray-900 dark:text-white/95 drop-shadow-sm">
                  <code
                    className="block"
                    dangerouslySetInnerHTML={{
                      __html: highlightCode(code, language),
                    }}
                  />
                </pre>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full p-4">{children}</div>
            )}
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-1 opacity-60 group-hover:opacity-100 transition-all duration-500 rounded-b-2xl shadow-lg"
          style={{
            background: `linear-gradient(90deg, ${langStyle.shadowColor}, ${langStyle.shadowColor}80)`,
            boxShadow: `0 0 20px ${langStyle.shadowColor}40`,
          }}
        />

        <div
          className="absolute -inset-2 opacity-0 group-hover:opacity-30 blur-3xl transition-all duration-700 -z-10 rounded-3xl"
          style={{
            background: `radial-gradient(circle, ${langStyle.shadowColor}60, transparent 70%)`,
          }}
        />
      </div>
    )
  },
)

Card.displayName = "Card"

interface Slot {
  x: number
  y: number
  z: number
  zIndex: number
}

const makeSlot = (i: number, distX: number, distY: number, total: number): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
})

const placeNow = (el: HTMLElement, slot: Slot, skew: number) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  })

const CardSwap: React.FC<CardSwapProps> = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = "elastic",
  children,
}) => {
  const config =
    easing === "elastic"
      ? {
          ease: "elastic.out(0.6,0.9)",
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05,
        }
      : {
          ease: "power1.inOut",
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2,
        }

  const childArr = useMemo(() => Children.toArray(children) as ReactElement<CardProps>[], [children])

  const refs = useMemo(
    () => childArr.map(() => React.createRef<HTMLDivElement>()),
    [childArr],
  )
  const order = useRef<number[]>(Array.from({ length: childArr.length }, (_, i) => i))

  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const intervalRef = useRef<number | undefined>(undefined)
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const total = refs.length
    refs.forEach((r, i) => placeNow(r.current!, makeSlot(i, cardDistance, verticalDistance, total), skewAmount))

    const swap = () => {
      if (order.current.length < 2) return

      const [front, ...rest] = order.current
      const elFront = refs[front].current!
      const tl = gsap.timeline()
      tlRef.current = tl

      tl.to(elFront, {
        y: "+=500",
        duration: config.durDrop,
        ease: config.ease,
      })

      tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`)
      rest.forEach((idx, i) => {
        const el = refs[idx].current!
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length)
        tl.set(el, { zIndex: slot.zIndex }, "promote")
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease,
          },
          `promote+=${i * 0.15}`,
        )
      })

      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length)
      tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`)
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex })
        },
        undefined,
        "return",
      )
      tl.set(elFront, { x: backSlot.x, z: backSlot.z }, "return")
      tl.to(
        elFront,
        {
          y: backSlot.y,
          duration: config.durReturn,
          ease: config.ease,
        },
        "return",
      )

      tl.call(() => {
        order.current = [...rest, front]
      })
    }

    swap()
    intervalRef.current = window.setInterval(swap, delay)

    if (pauseOnHover) {
      const node = container.current!
      const pause = () => {
        tlRef.current?.pause()
        clearInterval(intervalRef.current)
      }
      const resume = () => {
        tlRef.current?.play()
        intervalRef.current = window.setInterval(swap, delay)
      }
      node.addEventListener("mouseenter", pause)
      node.addEventListener("mouseleave", resume)
      return () => {
        node.removeEventListener("mouseenter", pause)
        node.removeEventListener("mouseleave", resume)
        clearInterval(intervalRef.current)
      }
    }
    return () => clearInterval(intervalRef.current)
  }, [
    cardDistance,
    verticalDistance,
    delay,
    pauseOnHover,
    skewAmount,
    easing,
    config.durDrop,
    config.durMove,
    config.durReturn,
    config.ease,
    config.promoteOverlap,
    config.returnDelay,
    refs,
  ])

  const rendered = childArr.map((child, i) =>
    isValidElement<CardProps>(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: (e) => {
            child.props.onClick?.(e as React.MouseEvent<HTMLDivElement>)
            onCardClick?.(i)
          },
        } as CardProps & React.RefAttributes<HTMLDivElement>)
      : child,
  )

  return (
    <div
      ref={container}
      className="absolute top-1/2 right-0 transform translate-x-[5%] translate-y-[-35%] origin-center perspective-[900px] overflow-visible 
           sm:translate-x-[10%] sm:translate-y-[-45%] sm:scale-90
           md:translate-x-[5%] md:translate-y-[-35%] md:scale-100
           max-sm:translate-x-[15%] max-sm:translate-y-[-40%] max-sm:scale-75
           max-xs:translate-x-[20%] max-xs:translate-y-[-45%] max-xs:scale-[0.6]"
      style={{ width, height }}
    >
      {rendered}
    </div>
  )
}

export default CardSwap