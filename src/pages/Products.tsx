import { useState, useEffect } from "react"
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'
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
  const { user } = useAuth()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [user])

  const fetchProducts = async () => {
    if (!user) return
    
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error('Error fetching products:', error)
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSetPriceRange = (product: any) => {
    setEditingProduct(product)
    setMinPrice(product.min_price ? product.min_price.toString() : "")
    setMaxPrice(product.max_price ? product.max_price.toString() : "")
  }

  const handleSavePriceRange = async () => {
    if (!editingProduct || !user) return

    try {
      const { error } = await supabase
        .from('products')
        .update({
          min_price: minPrice ? parseInt(minPrice) : null,
          max_price: maxPrice ? parseInt(maxPrice) : null
        })
        .eq('id', editingProduct.id)
        .eq('user_id', user.id)

      if (error) throw error

      toast({
        title: "Success",
        description: "Price range updated successfully"
      })

      // Refresh products list
      fetchProducts()
      setEditingProduct(null)
      setMinPrice("")
      setMaxPrice("")
    } catch (error) {
      console.error('Error saving price range:', error)
      toast({
        title: "Error",
        description: "Failed to update price range",
        variant: "destructive"
      })
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
                <TableHead>Category</TableHead>
                <TableHead>Current Price</TableHead>
                <TableHead>Min Price</TableHead>
                <TableHead>Max Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    Loading products...
                  </TableCell>
                </TableRow>
              ) : products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    No products found
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product) => (
                  <TableRow key={product.id} className="hover:bg-secondary/50">
                    <TableCell>
                      <div className="font-medium text-foreground">{product.name}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">Product</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{product.current_price?.toLocaleString()} ₸</TableCell>
                    <TableCell className="text-muted-foreground">
                      {product.min_price ? `${product.min_price.toLocaleString()} ₸` : 'Not set'}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {product.max_price ? `${product.max_price.toLocaleString()} ₸` : 'Not set'}
                    </TableCell>
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
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default Products