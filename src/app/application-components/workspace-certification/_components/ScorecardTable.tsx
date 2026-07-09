import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell, TableStatusCell } from "@/components/table";
import { SCORECARD_CATEGORIES, contributionPercent } from "../_data/scorecard";

export function ScorecardTable() {
  return (
    <Table
      minWidth="820px"
      caption="Workspace certification scorecard: nine categories, their point weight, purpose, passing criteria, and share of the total possible score."
    >
      <TableHeader sticky={false}>
        <tr>
          <TableHead sticky>Category</TableHead>
          <TableHead className="px-3">Weight</TableHead>
          <TableHead className="px-3">Purpose</TableHead>
          <TableHead className="whitespace-normal px-3">Passing criteria</TableHead>
          <TableHead className="px-3">Contribution</TableHead>
        </tr>
      </TableHeader>
      <TableBody>
        {SCORECARD_CATEGORIES.map((category) => (
          <TableRow key={category.id}>
            <TableHead scope="row" sticky className="whitespace-normal align-top">
              {category.href ? (
                <Link
                  href={category.href}
                  className="focus-ring flex w-fit items-center gap-1 rounded-md text-body-sm font-medium text-accent-400 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-accent-300"
                >
                  {category.label}
                  <ArrowUpRight className="size-3.5" aria-hidden />
                </Link>
              ) : (
                <span className="text-body-sm font-medium text-ink-primary">{category.label}</span>
              )}
            </TableHead>
            <TableStatusCell label={`${category.weight} pts`} tone="accent" className="px-3 align-top" />
            <TableCell className="max-w-xs px-3 align-top">{category.purpose}</TableCell>
            <TableCell className="max-w-xs px-3 align-top">{category.passingCriteria}</TableCell>
            <TableCell nowrap className="px-3 align-top">
              {contributionPercent(category)}%
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
