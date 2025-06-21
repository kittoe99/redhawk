"use client"

import Link from "next/link"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle, XCircle, Search } from "lucide-react"
import { cn } from "@/lib/utils"

export function ServiceAvailabilityChecker() {
  const [zipCode, setZipCode] = useState("")
  const [result, setResult] = useState<null | { available: boolean; message: string }>(null)
  const [isChecking, setIsChecking] = useState(false)
  const router = useRouter()

  useEffect(() => {
    let redirectTimer: NodeJS.Timeout | null = null

    if (result && result.available) {
      redirectTimer = setTimeout(() => {
        router.push("/quote")
      }, 2000)
    }

    return () => {
      if (redirectTimer) clearTimeout(redirectTimer)
    }
  }, [result, router])

  // Sample serviceable ZIP codes from all 10 cities
  const serviceableZipCodes = [
    // Austin, TX
    "78701",
    "78702",
    "78703",
    "78704",
    "78705",
    "78712",
    "78717",
    "78719",
    "78721",
    "78722",
    "78723",
    "78724",
    "78725",
    "78726",
    "78727",
    "78728",
    "78729",
    "78730",
    "78731",
    "78732",
    "78733",
    "78734",
    "78735",
    "78736",
    "78737",
    "78738",
    "78739",
    "78741",
    "78742",
    "78744",
    "78745",
    "78746",
    "78747",
    "78748",
    "78749",
    "78750",
    "78751",
    "78752",
    "78753",
    "78754",
    "78756",
    "78757",
    "78758",
    "78759",

    // Nashville, TN
    "37201",
    "37203",
    "37204",
    "37205",
    "37206",
    "37207",
    "37208",
    "37209",
    "37210",
    "37211",
    "37212",
    "37213",
    "37214",
    "37215",
    "37216",
    "37217",
    "37218",
    "37219",
    "37220",
    "37221",
    "37228",
    "37072",
    "37076",
    "37080",
    "37086",
    "37115",
    "37122",
    "37135",
    "37138",
    "37189",
    "37211",
    "37214",
    "37217",

    // Boise, ID
    "83701",
    "83702",
    "83703",
    "83704",
    "83705",
    "83706",
    "83709",
    "83712",
    "83713",
    "83714",
    "83716",
    "83719",
    "83720",
    "83724",
    "83725",
    "83726",
    "83728",
    "83729",
    "83731",
    "83732",
    "83735",
    "83756",
    "83799",

    // Raleigh, NC
    "27601",
    "27603",
    "27604",
    "27605",
    "27606",
    "27607",
    "27608",
    "27609",
    "27610",
    "27612",
    "27613",
    "27614",
    "27615",
    "27616",
    "27617",
    "27619",
    "27620",
    "27622",
    "27623",
    "27624",
    "27626",
    "27627",
    "27628",
    "27629",
    "27634",
    "27635",
    "27636",
    "27640",
    "27650",
    "27656",
    "27658",
    "27661",
    "27668",
    "27675",
    "27676",
    "27690",
    "27695",
    "27697",
    "27698",
    "27699",

    // Phoenix, AZ
    "85001",
    "85002",
    "85003",
    "85004",
    "85005",
    "85006",
    "85007",
    "85008",
    "85009",
    "85010",
    "85011",
    "85012",
    "85013",
    "85014",
    "85015",
    "85016",
    "85017",
    "85018",
    "85019",
    "85020",
    "85021",
    "85022",
    "85023",
    "85024",
    "85025",
    "85026",
    "85027",
    "85028",
    "85029",
    "85030",
    "85031",
    "85032",
    "85033",
    "85034",
    "85035",
    "85036",
    "85037",
    "85038",
    "85039",
    "85040",
    "85041",
    "85042",
    "85043",
    "85044",
    "85045",
    "85046",
    "85048",
    "85050",
    "85051",
    "85053",
    "85054",
    "85055",
    "85060",
    "85061",
    "85062",
    "85063",
    "85064",
    "85065",
    "85066",
    "85067",
    "85068",
    "85069",
    "85070",
    "85071",
    "85072",
    "85073",
    "85074",
    "85075",
    "85076",
    "85078",
    "85079",
    "85080",
    "85082",
    "85083",
    "85085",
    "85086",
    "85087",
    "85098",

    // Tampa, FL
    "33601",
    "33602",
    "33603",
    "33604",
    "33605",
    "33606",
    "33607",
    "33608",
    "33609",
    "33610",
    "33611",
    "33612",
    "33613",
    "33614",
    "33615",
    "33616",
    "33617",
    "33618",
    "33619",
    "33620",
    "33621",
    "33622",
    "33623",
    "33624",
    "33625",
    "33626",
    "33629",
    "33630",
    "33631",
    "33633",
    "33634",
    "33635",
    "33637",
    "33646",
    "33647",
    "33650",
    "33655",
    "33660",
    "33661",
    "33662",
    "33663",
    "33664",
    "33672",
    "33673",
    "33674",
    "33675",
    "33677",
    "33679",
    "33680",
    "33681",
    "33682",
    "33684",
    "33685",
    "33686",
    "33687",
    "33688",
    "33689",
    "33694",

    // Charlotte, NC
    "28201",
    "28202",
    "28203",
    "28204",
    "28205",
    "28206",
    "28207",
    "28208",
    "28209",
    "28210",
    "28211",
    "28212",
    "28213",
    "28214",
    "28215",
    "28216",
    "28217",
    "28218",
    "28219",
    "28220",
    "28221",
    "28222",
    "28223",
    "28224",
    "28226",
    "28227",
    "28228",
    "28229",
    "28230",
    "28231",
    "28232",
    "28233",
    "28234",
    "28235",
    "28236",
    "28237",
    "28241",
    "28242",
    "28243",
    "28244",
    "28246",
    "28247",
    "28250",
    "28253",
    "28254",
    "28255",
    "28256",
    "28258",
    "28260",
    "28262",
    "28263",
    "28265",
    "28266",
    "28269",
    "28270",
    "28271",
    "28272",
    "28273",
    "28274",
    "28275",
    "28277",
    "28278",
    "28280",
    "28281",
    "28282",
    "28284",
    "28285",
    "28287",
    "28288",
    "28289",
    "28290",
    "28296",
    "28297",
    "28299",

    // Denver, CO
    "80201",
    "80202",
    "80203",
    "80204",
    "80205",
    "80206",
    "80207",
    "80208",
    "80209",
    "80210",
    "80211",
    "80212",
    "80214",
    "80215",
    "80216",
    "80217",
    "80218",
    "80219",
    "80220",
    "80221",
    "80222",
    "80223",
    "80224",
    "80225",
    "80226",
    "80227",
    "80228",
    "80229",
    "80230",
    "80231",
    "80232",
    "80233",
    "80234",
    "80235",
    "80236",
    "80237",
    "80238",
    "80239",
    "80241",
    "80243",
    "80244",
    "80246",
    "80247",
    "80248",
    "80249",
    "80250",
    "80251",
    "80252",
    "80256",
    "80257",
    "80259",
    "80260",
    "80261",
    "80262",
    "80263",
    "80264",
    "80265",
    "80266",
    "80271",
    "80273",
    "80274",
    "80281",
    "80290",
    "80291",
    "80293",
    "80294",
    "80299",

    // Columbus, OH
    "43085",
    "43201",
    "43202",
    "43203",
    "43204",
    "43205",
    "43206",
    "43207",
    "43209",
    "43210",
    "43211",
    "43212",
    "43213",
    "43214",
    "43215",
    "43216",
    "43217",
    "43218",
    "43219",
    "43220",
    "43221",
    "43222",
    "43223",
    "43224",
    "43226",
    "43227",
    "43228",
    "43229",
    "43230",
    "43231",
    "43232",
    "43234",
    "43235",
    "43236",
    "43240",
    "43251",
    "43260",
    "43266",
    "43268",
    "43270",
    "43271",
    "43272",
    "43279",
    "43287",
    "43291",

    // Salt Lake City, UT
    "84101",
    "84102",
    "84103",
    "84104",
    "84105",
    "84106",
    "84108",
    "84109",
    "84110",
    "84111",
    "84112",
    "84113",
    "84114",
    "84115",
    "84116",
    "84117",
    "84118",
    "84119",
    "84120",
    "84121",
    "84122",
    "84123",
    "84124",
    "84125",
    "84126",
    "84127",
    "84128",
    "84130",
    "84131",
    "84132",
    "84133",
    "84134",
    "84136",
    "84138",
    "84139",
    "84141",
    "84143",
    "84144",
    "84145",
    "84147",
    "84148",
    "84150",
    "84151",
    "84152",
    "84157",
    "84158",
    "84165",
    "84170",
    "84171",
    "84180",
    "84184",
    "84189",
    "84190",
    "84199",
  ]

  const handleCheck = () => {
    if (!zipCode || zipCode.length !== 5 || !/^\d+$/.test(zipCode)) {
      setResult({
        available: false,
        message: "Please enter a valid 5-digit ZIP code.",
      })
      return
    }

    setIsChecking(true)

    // Simulate API call with a timeout
    setTimeout(() => {
      const isServiceable = serviceableZipCodes.includes(zipCode)

      setResult({
        available: isServiceable,
        message: isServiceable
          ? "Great news! We have independent moving helpers available in your area. Redirecting you to get a quote..."
          : "We're sorry, but we don't currently have helpers in this ZIP code. We're expanding quickly, so please check back soon!",
      })
      setIsChecking(false)
    }, 1000)
  }

  return (
    <div className="rounded-xl overflow-hidden relative border-0 shadow-[0_0_0_2px_rgba(211,0,0,0.1),0_4px_20px_rgba(0,0,0,0.08)] before:absolute before:inset-0 before:rounded-xl before:p-[1px] before:bg-gradient-to-r before:from-primary-300/40 before:via-primary-500/40 before:to-primary-300/40 before:blur-[0.5px] before:-z-10">
      <div className="p-6 relative bg-white rounded-xl">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary-100/40 to-primary-200/30 rounded-full -mr-12 -mt-12 backdrop-blur-sm"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-secondary-100/40 to-secondary-200/30 rounded-full -ml-10 -mb-10 backdrop-blur-sm"></div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary-400/60 rounded-tl-md"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary-400/60 rounded-tr-md"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary-400/60 rounded-bl-md"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary-400/60 rounded-br-md"></div>

        {/* Hawk icon */}
        <div className="absolute top-3 right-3 opacity-80">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#d30000">
            <path
              d="M22,2L12,13L10,10L22,2z M4.7,19.3c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0L10,17.41
            L6.59,14L4.7,15.89c-0.39,0.39-0.39,1.02,0,1.41C5.09,17.7,5.72,17.7,6.11,17.3L7.59,16L9,17.41L7.11,19.3
            c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0L11,18.41l4.3,4.3c0.39,0.39,1.02,0.39,1.41,0
            c0.39-0.39,0.39-1.02,0-1.41L10.59,15L17,8.41V15c0,0.55,0.45,1,1,1s1-0.45,1-1V5.41L22.59,2H22z"
            />
          </svg>
        </div>

        <div className="p-4 relative z-10">
          <h3 className="text-lg font-semibold text-center text-gray-800 mb-1">Find Moving Helpers Near You</h3>
          <p className="text-secondary-700 mb-4 text-center text-sm">
            Enter your ZIP code to find verified moving helpers in your area.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 relative z-10">
          <div className="relative w-full sm:w-3/4 mx-auto">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
              <Search className="h-6 w-6" />
            </div>
            <Input
              type="text"
              placeholder="Enter ZIP code"
              value={zipCode}
              onChange={(e) => {
                const value = e.target.value
                if (value === "" || (/^\d+$/.test(value) && value.length <= 5)) {
                  setZipCode(value)
                }
              }}
              className="w-full pl-12 h-12 text-base text-gray-900"
              maxLength={5}
            />
          </div>
          <Button
            onClick={handleCheck}
            disabled={isChecking}
            className="bg-primary-600 hover:bg-primary-700 text-white h-12 px-5 font-medium text-base transition-all duration-300 hover:shadow-md"
          >
            {isChecking ? "Checking..." : "Check Availability"}
          </Button>
        </div>

        {result && (
          <div
            className={cn(
              "mt-4 p-4 rounded-lg flex items-start gap-3 border transition-all duration-300",
              result.available
                ? "bg-gradient-to-r from-green-50 to-green-100 border-green-200 text-green-800"
                : "bg-gradient-to-r from-red-50 to-red-100 border-red-200 text-red-800",
              "animate-fadeIn",
            )}
          >
            {result.available ? (
              <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-medium">{result.message}</p>
              {result.available && (
                <Button
                  asChild
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 transition-all duration-300 hover:shadow-md"
                >
                  <Link href="/quote">Get a Free Quote</Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
