import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import RecentSaleComponent from "./RecentSaleComponent"

export function RecentSales() {
  return (
    <div className="space-y-8">
  
  <RecentSaleComponent />
  <RecentSaleComponent />
  <RecentSaleComponent />
    </div>
  )
}
