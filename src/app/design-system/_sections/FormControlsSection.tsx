"use client";

import { useState } from "react";
import { Mail, Percent } from "lucide-react";
import {
  TextInput,
  Textarea,
  Select,
  Checkbox,
  RadioGroup,
  ToggleSwitch,
  SegmentedControl,
  Slider,
  SearchInput,
  FormField,
  FieldGroup,
  FilterBar,
  Button,
  Caption,
} from "@/components/ui";
import { PreviewSection, StateLabel } from "../_components/preview-primitives";

const PLAN_OPTIONS = [
  { value: "starter", label: "Starter" },
  { value: "growth", label: "Growth" },
  { value: "scale", label: "Scale" },
];

export function FormControlsSection() {
  const [search, setSearch] = useState("");
  const [loadingSearch, setLoadingSearch] = useState("");
  const [indeterminate] = useState(true);
  const [radioValue, setRadioValue] = useState("growth");
  const [radioValueHorizontal, setRadioValueHorizontal] = useState("starter");
  const [toggleOn, setToggleOn] = useState(true);
  const [toggleOff, setToggleOff] = useState(false);
  const [density, setDensity] = useState<"compact" | "comfortable" | "spacious">("comfortable");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sliderValue, setSliderValue] = useState(40);
  const [filterQuery, setFilterQuery] = useState("");
  const [activeChip, setActiveChip] = useState<string | null>("active");

  return (
    <PreviewSection
      id="form-controls"
      eyebrow="forms & controls"
      title="Standard input & control components"
      description="The interaction vocabulary every settings panel, filter bar, and playground control is built from — token-driven, keyboard-accessible, reduced-motion aware."
    >
      <div className="flex flex-col gap-14">
        {/* TextInput */}
        <div>
          <Caption className="mb-4">TextInput, states</Caption>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <StateLabel label="Default + label">
              <TextInput label="Workspace name" placeholder="Acme Manufacturing" />
            </StateLabel>
            <StateLabel label="Helper text">
              <TextInput label="Subdomain" placeholder="acme" helperText="This becomes acme.studiopod.app" />
            </StateLabel>
            <StateLabel label="Disabled">
              <TextInput label="Account ID" defaultValue="acct_18f2a0" disabled />
            </StateLabel>
            <StateLabel label="Error">
              <TextInput label="Email" defaultValue="not-an-email" status="error" helperText="Enter a valid email address" />
            </StateLabel>
            <StateLabel label="Success">
              <TextInput label="Email" defaultValue="ops@acme.com" status="success" helperText="Verified" />
            </StateLabel>
            <StateLabel label="Leading icon + trailing action">
              <TextInput
                label="Billing email"
                placeholder="billing@acme.com"
                leadingIcon={<Mail className="size-4" />}
                trailingAction={
                  <Button size="sm" variant="ghost" className="h-6 px-2 text-[11px]">
                    Verify
                  </Button>
                }
              />
            </StateLabel>
          </div>
        </div>

        {/* Textarea */}
        <div>
          <Caption className="mb-4">Textarea, states</Caption>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <StateLabel label="Default">
              <Textarea label="Notes" placeholder="Internal notes for this order…" />
            </StateLabel>
            <StateLabel label="Disabled">
              <Textarea label="Notes" defaultValue="Locked after approval." disabled />
            </StateLabel>
            <StateLabel label="Error + resizable">
              <Textarea
                label="Cancellation reason"
                status="error"
                helperText="Required to cancel this order"
                resizable
              />
            </StateLabel>
          </div>
        </div>

        {/* Select */}
        <div>
          <Caption className="mb-4">Select, states</Caption>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <StateLabel label="Placeholder">
              <Select label="Plan" placeholder="Choose a plan" options={PLAN_OPTIONS} />
            </StateLabel>
            <StateLabel label="Helper text">
              <Select label="Plan" defaultValue="growth" options={PLAN_OPTIONS} helperText="Billed monthly" />
            </StateLabel>
            <StateLabel label="Disabled">
              <Select label="Plan" defaultValue="scale" options={PLAN_OPTIONS} disabled />
            </StateLabel>
            <StateLabel label="Error">
              <Select
                label="Fulfillment region"
                placeholder="Select a region"
                options={PLAN_OPTIONS}
                status="error"
                helperText="A region is required"
              />
            </StateLabel>
          </div>
        </div>

        {/* Checkbox */}
        <div>
          <Caption className="mb-4">Checkbox, states</Caption>
          <div className="flex flex-wrap gap-8">
            <StateLabel label="Unchecked">
              <Checkbox label="Email notifications" />
            </StateLabel>
            <StateLabel label="Checked">
              <Checkbox label="SMS alerts" defaultChecked />
            </StateLabel>
            <StateLabel label="Indeterminate">
              <Checkbox label="Select all warehouses" indeterminate={indeterminate} helperText="3 of 7 selected" />
            </StateLabel>
            <StateLabel label="Disabled">
              <Checkbox label="Legacy sync (deprecated)" disabled />
            </StateLabel>
          </div>
        </div>

        {/* RadioGroup */}
        <div>
          <Caption className="mb-4">RadioGroup, orientation</Caption>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <StateLabel label="Vertical">
              <RadioGroup
                label="Plan"
                value={radioValue}
                onChange={setRadioValue}
                options={[
                  { value: "starter", label: "Starter" },
                  { value: "growth", label: "Growth" },
                  { value: "scale", label: "Scale", disabled: true },
                ]}
              />
            </StateLabel>
            <StateLabel label="Horizontal">
              <RadioGroup
                label="Billing cycle"
                orientation="horizontal"
                value={radioValueHorizontal}
                onChange={setRadioValueHorizontal}
                options={[
                  { value: "starter", label: "Monthly" },
                  { value: "growth", label: "Annual" },
                ]}
              />
            </StateLabel>
          </div>
        </div>

        {/* ToggleSwitch */}
        <div>
          <Caption className="mb-4">ToggleSwitch, states</Caption>
          <div className="flex flex-wrap gap-8">
            <StateLabel label="On">
              <ToggleSwitch checked={toggleOn} onChange={setToggleOn} label="Reduced motion" />
            </StateLabel>
            <StateLabel label="Off">
              <ToggleSwitch checked={toggleOff} onChange={setToggleOff} label="Beta features" helperText="Opt in to early access" />
            </StateLabel>
            <StateLabel label="Disabled">
              <ToggleSwitch checked={true} onChange={() => {}} label="SSO enforced" disabled />
            </StateLabel>
          </div>
        </div>

        {/* SegmentedControl */}
        <div>
          <Caption className="mb-4">SegmentedControl, option counts</Caption>
          <div className="flex flex-wrap gap-8">
            <StateLabel label="2 options">
              <SegmentedControl
                aria-label="View"
                value={view}
                onChange={setView}
                options={[
                  { value: "grid", label: "Grid" },
                  { value: "list", label: "List" },
                ]}
              />
            </StateLabel>
            <StateLabel label="3 options, one disabled">
              <SegmentedControl
                aria-label="Density"
                value={density}
                onChange={setDensity}
                options={[
                  { value: "compact", label: "Compact" },
                  { value: "comfortable", label: "Comfortable" },
                  { value: "spacious", label: "Spacious", disabled: true },
                ]}
              />
            </StateLabel>
            <StateLabel label="4 options, disabled group">
              <SegmentedControl
                aria-label="Speed"
                value="1x"
                onChange={() => {}}
                disabled
                options={[
                  { value: "0.5x", label: "0.5x" },
                  { value: "1x", label: "1x" },
                  { value: "1.5x", label: "1.5x" },
                  { value: "2x", label: "2x" },
                ]}
              />
            </StateLabel>
          </div>
        </div>

        {/* Slider */}
        <div>
          <Caption className="mb-4">Slider, states</Caption>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <StateLabel label="Value display">
              <Slider
                label="Reorder threshold"
                value={sliderValue}
                onChange={setSliderValue}
                formatValue={(v) => (
                  <span className="inline-flex items-center gap-0.5">
                    {v}
                    <Percent className="size-3" />
                  </span>
                )}
              />
            </StateLabel>
            <StateLabel label="Min/max">
              <Slider label="Batch size" value={12} onChange={() => {}} min={1} max={24} />
            </StateLabel>
            <StateLabel label="Disabled">
              <Slider label="Locked allocation" value={70} onChange={() => {}} disabled />
            </StateLabel>
          </div>
        </div>

        {/* SearchInput */}
        <div>
          <Caption className="mb-4">SearchInput, states</Caption>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <StateLabel label="Default + clear button (try it)">
              <SearchInput value={search} onChange={setSearch} placeholder="Search orders" />
            </StateLabel>
            <StateLabel label="Loading">
              <SearchInput value={loadingSearch} onChange={setLoadingSearch} loading placeholder="Search products" />
            </StateLabel>
            <StateLabel label="Empty state helper">
              <SearchInput value="titanium widget" onChange={() => {}} emptyStateHelper="No results for “titanium widget”" />
            </StateLabel>
          </div>
        </div>

        {/* FormField + FieldGroup */}
        <div>
          <Caption className="mb-4">FormField wrapper + FieldGroup layouts</Caption>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <FieldGroup layout="card" title="Notification preferences" description="Choose how you hear about order events.">
              <FormField label="Delivery channel" description="Where alerts are sent" required>
                <RadioGroup
                  orientation="horizontal"
                  defaultValue="email"
                  options={[
                    { value: "email", label: "Email" },
                    { value: "sms", label: "SMS" },
                  ]}
                />
              </FormField>
              <FormField label="Escalation threshold" errorText="Must be between 1 and 24 hours">
                <TextInput status="error" defaultValue="30" trailingAction={<span className="text-caption text-ink-tertiary">hrs</span>} />
              </FormField>
            </FieldGroup>
            <FieldGroup layout="compact" title="Compact layout">
              <Checkbox label="Auto-approve returns under $50" defaultChecked />
              <Checkbox label="Require manager sign-off over $500" />
              <ToggleSwitch checked={false} onChange={() => {}} label="Weekly digest email" />
            </FieldGroup>
          </div>
        </div>

        {/* FilterBar */}
        <div>
          <Caption className="mb-4">FilterBar</Caption>
          <FilterBar
            search={{ value: filterQuery, onChange: setFilterQuery, placeholder: "Filter orders" }}
            chips={[
              { key: "active", label: "Active" },
              { key: "backordered", label: "Backordered" },
              { key: "shipped", label: "Shipped" },
            ]}
            activeChip={activeChip}
            onChipChange={setActiveChip}
            onReset={() => {
              setFilterQuery("");
              setActiveChip(null);
            }}
          />
        </div>
      </div>
    </PreviewSection>
  );
}
