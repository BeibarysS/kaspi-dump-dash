import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  Filter, 
  Plus, 
  Edit,
  DollarSign
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
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
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")

  const products = [
    {
      id: 1,
      name: "Samsung Galaxy S24 Ultra",
      currentPrice: "399,990 ₸",
      minPrice: "350,000 ₸",
      maxPrice: "450,000 ₸",
      category: "Smartphones"
    },
    {
      id: 2,
      name: "iPhone 15 Pro Max",
      currentPrice: "599,990 ₸",
      minPrice: "550,000 ₸",
      maxPrice: "650,000 ₸",
      category: "Smartphones"
    },
    {
      id: 3,
      name: "MacBook Air M3",
      currentPrice: "449,990 ₸",
      minPrice: "400,000 ₸",
      maxPrice: "500,000 ₸",
      category: "Laptops"
    },
    {
      id: 4,
      name: "AirPods Pro 2",
      currentPrice: "89,990 ₸",
      minPrice: "75,000 ₸",
      maxPrice: "100,000 ₸",
      category: "Audio"
    }
  ]

  const handleSetPriceRange = (product: any) => {
    setEditingProduct(product)
    setMinPrice(product.minPrice.replace(" ₸", "").replace(",", ""))
    setMaxPrice(product.maxPrice.replace(" ₸", "").replace(",", ""))
  }

  const handleSavePriceRange = () => {
    // Here you would save the price range to your backend
    console.log(`Setting price range for ${editingProduct.name}: ${minPrice} - ${maxPrice}`)
    setEditingProduct(null)
    setMinPrice("")
    setMaxPrice("")
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
                <TableHead>Category</TableHead>
                <TableHead>Current Price</TableHead>
                <TableHead>Min Price</TableHead>
                <TableHead>Max Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} className="hover:bg-secondary/50">
                  <TableCell>
                    <div className="font-medium text-foreground">{product.name}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.category}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{product.currentPrice}</TableCell>
                  <TableCell className="text-muted-foreground">{product.minPrice}</TableCell>
                  <TableCell className="text-muted-foreground">{product.maxPrice}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSetPriceRange(product)}
                        >
                          <DollarSign className="w-4 h-4 mr-2" />
                          Set Price Range
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Set Price Range</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-medium text-foreground mb-2">{editingProduct?.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              Current price: {editingProduct?.currentPrice}
                            </p>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="minPrice">Minimum Price (₸)</Label>
                              <Input
                                id="minPrice"
                                type="number"
                                placeholder="350000"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                              />
                            </div>
                            <div>
                              <Label htmlFor="maxPrice">Maximum Price (₸)</Label>
                              <Input
                                id="maxPrice"
                                type="number"
                                placeholder="450000"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                              />
                            </div>
                          </div>
                          
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setEditingProduct(null)}>
                              Cancel
                            </Button>
                            <Button onClick={handleSavePriceRange} className="bg-gradient-primary hover:opacity-90">
                              Save Range
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
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