import { getProductPrice, Product } from "./product";

function expect(actual: any) {
    return {
      toEqual: (expected: any) => {
        if (actual === expected) {
          console.log(" ✅ PASS")
        } else {
          console.log(` ❌ FAIL: want ${expected} but got ${actual}`)
        }
      }
    }
}
  
function test(title: string, callback: () => void) {
    console.group(title);
    callback();
    console.groupEnd();
}

test("getProductPrice didn't give name and id should throw error", () => {
    const dummy = {
        search: null
    }
    try {
        getProductPrice(dummy, "","")  
    } catch (error) {
        expect(error.message).toEqual("Product name and product id are required")
    }
})

test("getProductPrice when product not found", () => {
    const stub = {
        search: (productName: string, productId: string) => null
    }
    try {
        getProductPrice(stub, "Laptop", "LAPTOP-123")  
    } catch (error) {
        expect(error.message).toEqual("Product not found")
    }
})

test("getProductPrice when product found stub", () => {
    const product: Product = {
        productName: "Laptop",
        productId: "LAPTOP-123",
        price: 999.99
    }
    const stub = {
        search: (productName: string, productId: string) => product
    }
    const actual = getProductPrice(stub, "Laptop", "LAPTOP-123")  
    expect(actual).toEqual(product.price)
})

test("getProductPrice when product found fake", () => {
    // fake version
    const product: Product = {
        productName: "Laptop",
        productId: "LAPTOP-123",
        price: 999.99
    }
    const stub = {
        search: (productName: string, productId: string) => {
            if (productName == "Laptop" && productId == "LAPTOP-123") {
                return product;
            }
            return null
        }
    }
    const actual = getProductPrice(stub, "Laptop", "LAPTOP-123")  
    expect(actual).toEqual(product.price)
})