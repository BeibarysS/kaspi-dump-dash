import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  Filter, 
  Plus, 
  TrendingUp, 
  TrendingDown,
  Eye,
  Edit,
  MoreHorizontal
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const products = [
    {
      id: 1,
      name: "Samsung Galaxy S24 Ultra",
      sku: "SAM-S24U-256",
      currentPrice: "399,990 ₸",
      competitorPrice: "389,990 ₸",
      margin: "15.2%",
      status: "underpriced",
      sales: 127,
      trend: "down"
    },
    {
      id: 2,
      name: "iPhone 15 Pro Max",
      sku: "APL-15PM-256",
      currentPrice: "599,990 ₸",
      competitorPrice: "609,990 ₸",
      margin: "22.8%",
      status: "competitive",
      sales: 89,
      trend: "up"
    },
    {
      id: 3,
      name: "MacBook Air M3",
      sku: "APL-MBA-M3-512",
      currentPrice: "449,990 ₸",
      competitorPrice: "439,990 ₸",
      margin: "18.5%",
      status: "overpriced",
      sales: 34,
      trend: "down"
    },
    {
      id: 4,
      name: "AirPods Pro 2",
      sku: "APL-APP2-2023",
      currentPrice: "89,990 ₸",
      competitorPrice: "92,990 ₸",
      margin: "25.3%",
      status: "competitive",
      sales: 156,
      trend: "up"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "competitive":
        return "bg-success text-success-foreground"
      case "underpriced":
        return "bg-warning text-warning-foreground"
      case "overpriced":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground">
            Manage your product catalog and pricing strategy
          </p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Filters */}
      <Card className="shadow-soft">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-foreground">Product List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Current Price</TableHead>
                <TableHead>Competitor Price</TableHead>
                <TableHead>Margin</TableHead>
                <TableHead>Sales</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} className="hover:bg-secondary/50">
                  <TableCell>
                    <div>
                      <div className="font-medium text-foreground">{product.name}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{product.sku}</TableCell>
                  <TableCell className="font-medium">{product.currentPrice}</TableCell>
                  <TableCell className="text-muted-foreground">{product.competitorPrice}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{product.margin}</span>
                      {product.trend === "up" ? (
                        <TrendingUp className="w-3 h-3 text-success" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-destructive" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{product.sales}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(product.status)}>
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Product
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default Products