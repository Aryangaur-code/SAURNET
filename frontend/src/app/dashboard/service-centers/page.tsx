"use client";

import { useState } from "react";
import { MapPin, Search, Phone, ExternalLink, Calendar, ShieldCheck, Info } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center text-slate-500">
      Loading map interface...
    </div>
  ),
});

interface Center {
  id: number;
  name: string;
  specialty: string;
  distance: string;
  phone: string;
  status: "active" | "busy";
  coords: { x: number; y: number };
}

const serviceCenters: Center[] = [
  {
    id: 1,
    name: "Faujdar Solar Energy",
    specialty: "Installation, AMC & Maintenance",
    distance: "Tagore Nagar, Ajmer Road",
    phone: "+91 86190 94288",
    status: "active",
    coords: { x: 35, y: 45 }
  },
  {
    id: 2,
    name: "Electrobeam Solar LLP",
    specialty: "Installation, AMC & Maintenance",
    distance: "Swej Farm",
    phone: "+91 93757 63230",
    status: "active",
    coords: { x: 40, y: 50 }
  },
  {
    id: 3,
    name: "Solsken Energy LLP",
    specialty: "Installation, AMC & Maintenance",
    distance: "Civil Lines",
    phone: "+91 77340 31150",
    status: "active",
    coords: { x: 45, y: 55 }
  },
  {
    id: 4,
    name: "Solaroof Solutions",
    specialty: "Installation, AMC & Maintenance",
    distance: "Sirsi Road",
    phone: "+91 97720 22280",
    status: "active",
    coords: { x: 30, y: 40 }
  },
  {
    id: 5,
    name: "Jaipur solar solutions",
    specialty: "Installation, AMC & Maintenance",
    distance: "Vaishali Nagar",
    phone: "+91 80037 17248",
    status: "active",
    coords: { x: 25, y: 35 }
  },
  {
    id: 6,
    name: "Solar solution power green energy",
    specialty: "Installation, AMC & Maintenance",
    distance: "Vaishali Nagar",
    phone: "+91 97855 01267",
    status: "active",
    coords: { x: 26, y: 36 }
  },
  {
    id: 7,
    name: "Smart Sun Power",
    specialty: "Installation, AMC & Maintenance",
    distance: "Vaishali Nagar",
    phone: "+91 99285 77898",
    status: "active",
    coords: { x: 27, y: 37 }
  },
  {
    id: 8,
    name: "Solar Planet",
    specialty: "Installation, AMC & Maintenance",
    distance: "Swej Farm",
    phone: "+91 98877 55000",
    status: "active",
    coords: { x: 41, y: 51 }
  },
  {
    id: 9,
    name: "Argus Solar Power",
    specialty: "Installation, AMC & Maintenance",
    distance: "Sodala",
    phone: "+91 98294 46949",
    status: "active",
    coords: { x: 48, y: 58 }
  },
  {
    id: 10,
    name: "SolarSquare",
    specialty: "Installation, AMC & Maintenance",
    distance: "Malviya Nagar",
    phone: "Website Contact",
    status: "active",
    coords: { x: 60, y: 70 }
  },
  {
    id: 11,
    name: "Solar91",
    specialty: "Installation, AMC & Maintenance",
    distance: "Jaipur",
    phone: "+91 72208 10810",
    status: "active",
    coords: { x: 50, y: 50 }
  },
  {
    id: 12,
    name: "mPOWER Green Energy Pvt Ltd",
    specialty: "Installation, AMC & Maintenance",
    distance: "Vaishali Nagar",
    phone: "+91 98290 67421",
    status: "active",
    coords: { x: 28, y: 38 }
  },
  {
    id: 13,
    name: "Solarium Green Energy Limited",
    specialty: "Installation, AMC & Maintenance",
    distance: "Jaipur",
    phone: "Corporate Contact",
    status: "active",
    coords: { x: 55, y: 55 }
  },
  {
    id: 14,
    name: "Easy solar cleaning service",
    specialty: "Repair, Cleaning & Maintenance",
    distance: "Murlipura",
    phone: "+91 70621 71169",
    status: "active",
    coords: { x: 20, y: 20 }
  },
  {
    id: 15,
    name: "GO WASH SOLAR",
    specialty: "Repair, Cleaning & Maintenance",
    distance: "Murlipura",
    phone: "+91 87642 44148",
    status: "active",
    coords: { x: 21, y: 21 }
  },
  {
    id: 16,
    name: "National solar maintenance service",
    specialty: "Repair, Cleaning & Maintenance",
    distance: "Mansarovar",
    phone: "Not Listed",
    status: "active",
    coords: { x: 70, y: 80 }
  },
  {
    id: 17,
    name: "GOCLEAN SOLAR SERVICES",
    specialty: "Repair, Cleaning & Maintenance",
    distance: "Tonk Road",
    phone: "+91 93765 70624",
    status: "active",
    coords: { x: 65, y: 75 }
  },
  {
    id: 18,
    name: "Jeen Kripa Inverter Battery & Solar",
    specialty: "Repair, Cleaning & Maintenance",
    distance: "Jaipur",
    phone: "Local Contact",
    status: "active",
    coords: { x: 52, y: 52 }
  },
  {
    id: 19,
    name: "Solar Company in Jaipur",
    specialty: "Installation / EPC",
    distance: "Vaishali Nagar",
    phone: "+91 97849 34774",
    status: "active",
    coords: { x: 29, y: 39 }
  },
  {
    id: 20,
    name: "Bright Solar Energies Solutions",
    specialty: "Installation / EPC",
    distance: "Shyam Nagar",
    phone: "Website Contact",
    status: "active",
    coords: { x: 42, y: 52 }
  },
  {
    id: 21,
    name: "Ksquare Energy",
    specialty: "Installation / EPC",
    distance: "Jaipur",
    phone: "Website Contact",
    status: "active",
    coords: { x: 53, y: 53 }
  },
  {
    id: 22,
    name: "RK Industries Solar",
    specialty: "Installation / EPC",
    distance: "Jaipur",
    phone: "Website Contact",
    status: "active",
    coords: { x: 54, y: 54 }
  },
  {
    id: 23,
    name: "Chairbord Solar",
    specialty: "Installation / EPC",
    distance: "Jaipur",
    phone: "Website Contact",
    status: "active",
    coords: { x: 55, y: 55 }
  },
  {
    id: 24,
    name: "Holsol India Pvt Ltd",
    specialty: "Installation / EPC",
    distance: "Jaipur",
    phone: "Website Contact",
    status: "active",
    coords: { x: 56, y: 56 }
  },
  {
    id: 25,
    name: "SMS Solar (Satnara Solar Infra)",
    specialty: "Installation / EPC",
    distance: "Vidyadhar Nagar",
    phone: "+91 88248 48418",
    status: "active",
    coords: { x: 15, y: 25 }
  },
  {
    id: 26,
    name: "Pinaka Solar Power",
    specialty: "Installation / EPC",
    distance: "Vidyadhar Nagar",
    phone: "+91 94604 62866",
    status: "active",
    coords: { x: 16, y: 26 }
  },
  {
    id: 27,
    name: "SRB Power India Pvt Ltd",
    specialty: "Installation / EPC",
    distance: "Vidyadhar Nagar",
    phone: "+91 96690 55575",
    status: "active",
    coords: { x: 17, y: 27 }
  },
  {
    id: 28,
    name: "Nexsun Solar",
    specialty: "Installation / EPC",
    distance: "Sirsi Road",
    phone: "+91 96940 01177",
    status: "active",
    coords: { x: 31, y: 41 }
  }
];

export default function ServiceCenters() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCenter, setSelectedCenter] = useState<Center>(serviceCenters[0]);

  const filteredCenters = serviceCenters.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Service Center Locator</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Locate certified Saurnet hardware technicians and solar array cleaning services.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Directory Search Panel */}
        <div className="space-y-6">
          <Card className="border-slate-200/60 dark:border-slate-800/80">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-base font-bold">Search Directory</CardTitle>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search by center name or skill..."
                  className="pl-10 text-xs h-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 divide-y divide-slate-100 dark:divide-slate-850 space-y-2 max-h-[400px] overflow-y-auto">
              {filteredCenters.map((center) => (
                <button
                  key={center.id}
                  onClick={() => setSelectedCenter(center)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all mt-2 flex flex-col gap-1 cursor-pointer
                    ${
                      selectedCenter.id === center.id
                        ? "border-emerald-500 bg-emerald-500/5"
                        : "border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-900/30"
                    }
                  `}
                >
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-900 dark:text-slate-200 truncate pr-2">{center.name}</span>
                    <Badge variant={center.status === "active" ? "success" : "warning"} className="px-1.5 py-0">
                      {center.status.toUpperCase()}
                    </Badge>
                  </div>
                  <span className="text-[10px] text-slate-400 leading-snug">{center.specialty}</span>
                  <div className="flex items-center gap-4 text-[10px] text-slate-400 font-semibold mt-1">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {center.distance}</span>
                    <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {center.phone}</span>
                  </div>
                </button>
              ))}
              {filteredCenters.length === 0 && (
                <p className="text-center text-slate-400 text-xs py-8">No centers found matching search term.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Leaflet-Compatible Map Placeholder */}
        <Card className="lg:col-span-2 border-slate-200/60 dark:border-slate-800/80 flex flex-col">
          <CardHeader className="flex flex-row justify-between items-center">
            <div>
              <CardTitle className="text-base font-bold flex items-center gap-1.5">
                <MapPin className="h-4.5 w-4.5 text-emerald-500" />
                Service Dispatch Map
              </CardTitle>
              <CardDescription>Leaflet-compatible map container placeholder</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-4">
            {/* The Map Div Container with standard Leaflet bounding classes */}
            <div
              id="saurnet-leaflet-map"
              className="relative flex-1 min-h-[300px] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-950 flex flex-col"
            >
              <MapComponent 
                centers={filteredCenters} 
                selectedCenter={selectedCenter} 
                setSelectedCenter={setSelectedCenter} 
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
