import React from "react";
import { render, screen } from "../../../../utils/test-utils";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "../table";

describe("Table Component", () => {
  it("renders table correctly with basic structure", () => {
    render(
      <Table>
        <TableCaption>A simple table for testing</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Age</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>30</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Footer content</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /age/i })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: /john doe/i })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: /30/i })).toBeInTheDocument();
    expect(screen.getByText("A simple table for testing")).toBeInTheDocument();
    expect(screen.getByText("Footer content")).toBeInTheDocument();
  });

  it("renders table without caption and footer", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Widget</TableCell>
            <TableCell>$10.99</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /product/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /price/i })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: /widget/i })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: /\$10\.99/i })).toBeInTheDocument();
  });

  it("applies custom className to table", () => {
    render(
      <Table className="custom-table-class">
        <TableBody>
          <TableRow>
            <TableCell>Test cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    const table = screen.getByRole("table");
    expect(table).toHaveClass("custom-table-class");
  });

  it("supports table with multiple rows", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>Alice</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>2</TableCell>
            <TableCell>Bob</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>3</TableCell>
            <TableCell>Charlie</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(screen.getAllByRole("row")).toHaveLength(4); // 1 header + 3 body rows
    expect(screen.getByRole("cell", { name: /alice/i })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: /bob/i })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: /charlie/i })).toBeInTheDocument();
  });
});