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