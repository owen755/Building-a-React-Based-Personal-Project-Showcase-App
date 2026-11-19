# ShopAdmin — E-Commerce Admin Portal

A React Single Page Application (SPA) built for managing e-commerce products with full CRUD operations, dynamic search, client-side routing, and automated component testing.

## Features
- **Landing Page (`/`)**: Overview of the admin portal with quick navigation.
- **Product Catalog (`/products`)**: Displays all products from a simulated REST API with real-time search by name or category and quick deletion.
- **Add Product (`/products/new`)**: Controlled form that sends a `POST` request to create a new product and redirects to the catalog.
- **Product Detail & Edit (`/products/:id`)**: Displays full product details and allows updating product name/price (`PATCH`) or removing the product (`DELETE`).
- **Custom & Standard Hooks**: Custom `useProducts` hook paired with `useContext`, `useState`, `useEffect`, `useRef`, and `useId`.

## Setup & Running Locally

1. **Install dependencies**
   npm install