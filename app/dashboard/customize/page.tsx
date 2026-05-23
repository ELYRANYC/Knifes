'use client';

import Link from 'next/link';
import { Plus, Trash2 } from 'lucide-react';
import { useProfileEditor } from '@/lib/use-profile-editor';
import type {
  BackgroundEffect,
  CursorEffect,
  ProfileEffect,
  UsernameEffect,
  FontFamily,
  GradientConfig,
} from '@/lib/types';
import CollapsibleSection from '@/components/dashboard/editor/collapsible-section';
import Toggle from '@/components/dashboard/editor/toggle';
import Slider from '@/components/dashboard/editor/slider';
import TextInput, { TextArea } from '@/components/dashboard/editor/text-input';
import Select from '@/components/dashboard/editor/select';
import SegmentedControl from '@/components/dashboard/editor/segmented-control';
import ColorPicker from '@/components/dashboard/editor/color-picker';
import GradientBuilder from '@/components/dashboard/editor/gradient-builder';
import FileUpload from '@/components/dashboard/editor/file-upload';
import FontSelector from '@/components/dashboard/editor/font-selector';
import LayoutSelector from '@/components/dashboard/editor/layout-selector';

const BG_EFFECTS: BackgroundEffect[] = ['none', 'snow', 'rain', 'particles', 'matrix', 'stars', 'bubbles', 'fireflies'];
const USERNAME_EFFECTS: UsernameEffect[] = ['none', 'gradient', 'glow', 'glitch', 'rainbow'];
const CURSOR_EFFECTS: CursorEffect[] = ['none', 'trail', 'glow', 'sparkle', 'hearts'];
const CARD_EFFECTS: ProfileEffect[] = ['none', 'rgb-glow', 'pulse', 'shake'];

const opt = (v: string) => ({ value: v, label: v });

export default function CustomizePage() {
  const { config, update } = useProfileEditor();
  const isTypewriter = Array.isArray(config.description);
  const phrases = isTypewriter ? (config.description as string[]) : [];
  const staticDesc = typeof config.description === 'string' ? config.description : '';

  const updateLayoutSettings = (patch: Record<string, unknown>) =>
    update({ layoutSettings: { ...config.layoutSettings, ...patch } });

  const gradient: GradientConfig = config.gradient ?? { from: config.colors.accent, to: '#000000', angle: 180 };

  return (
    <div className="flex flex-col gap-6">
      <header>
        <div className="section-overline mb-2">Customize</div>
        <h1 className="display-heading text-2xl">Profile editor</h1>
        <p className="text-[14px] mt-1" style={{ color: 'var(--text-secondary)' }}>
          Changes save automatically and appear in the preview.
        </p>
      </header>

      <div className="flex flex-col gap-3">
        {/* ---------------- Assets ---------------- */}
        <CollapsibleSection title="Assets" defaultOpen>
          <TextInput
            label="Display name"
            value={config.displayName}
            onChange={(e) => update({ displayName: e.target.value })}
            maxLength={40}
          />
          <FileUpload
            bucket="avatars"
            label="Avatar"
            value={config.avatar}
            onUploaded={(url) => update({ avatar: url })}
          />
          <SegmentedControl
            label="Background type"
            value={config.background.type}
            onChange={(t) => update({ background: { ...config.background, type: t } })}
            segments={[
              { value: 'solid', label: 'Solid' },
              { value: 'gradient', label: 'Gradient' },
              { value: 'image', label: 'Image' },
              { value: 'video', label: 'Video' },
            ]}
          />
          {config.background.type === 'solid' && (
            <ColorPicker
              label="Background color"
              value={config.background.value}
              onChange={(v) => update({ background: { ...config.background, value: v } })}
            />
          )}
          {config.background.type === 'gradient' && (
            <GradientBuilder value={gradient} onChange={(g) => update({ gradient: g })} />
          )}
          {(config.background.type === 'image' || config.background.type === 'video') && (
            <FileUpload
              bucket="backgrounds"
              label={config.background.type === 'image' ? 'Background image' : 'Background video'}
              value={config.background.type === 'image' ? config.background.value : undefined}
              preview={config.background.type === 'image' ? 'image' : 'none'}
              onUploaded={(url) => update({ background: { ...config.background, value: url } })}
            />
          )}
          {(config.background.type === 'image' || config.background.type === 'video') && (
            <Slider
              label="Background blur"
              value={config.background.blur ?? 0}
              min={0}
              max={32}
              suffix="px"
              onChange={(v) => update({ background: { ...config.background, blur: v } })}
            />
          )}
          <FileUpload
            bucket="cursors"
            label="Custom cursor"
            value={config.customCursor}
            onUploaded={(url) => update({ customCursor: url })}
            onClear={() => update({ customCursor: undefined })}
          />
        </CollapsibleSection>

        {/* ---------------- General ---------------- */}
        <CollapsibleSection title="General" defaultOpen>
          <Toggle
            label="Typewriter description"
            description="Cycle through multiple phrases"
            checked={isTypewriter}
            onChange={(on) =>
              update({ description: on ? (staticDesc ? [staticDesc] : ['']) : (phrases[0] ?? '') })
            }
          />
          {isTypewriter ? (
            <div className="flex flex-col gap-2">
              {phrases.map((p, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    className="field"
                    value={p}
                    onChange={(e) => {
                      const next = [...phrases];
                      next[i] = e.target.value;
                      update({ description: next });
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => update({ description: phrases.filter((_, j) => j !== i) })}
                    className="flex-shrink-0 p-2 rounded-lg transition-colors hover:bg-white/[0.05]"
                    style={{ color: 'var(--text-tertiary)' }}
                    aria-label="Remove phrase"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => update({ description: [...phrases, ''] })}
                className="inline-flex items-center gap-1.5 text-[13px] self-start mt-1"
                style={{ color: 'var(--text-secondary)' }}
              >
                <Plus size={14} /> Add phrase
              </button>
            </div>
          ) : (
            <TextArea
              label="Description"
              value={staticDesc}
              onChange={(e) => update({ description: e.target.value })}
              maxLength={300}
            />
          )}

          <TextInput
            label="Location"
            value={config.location ?? ''}
            onChange={(e) => update({ location: e.target.value })}
            placeholder="e.g. New York"
          />

          <Select<BackgroundEffect>
            label="Background effect"
            value={(config.backgroundEffect ?? 'none') as BackgroundEffect}
            onChange={(v) => update({ backgroundEffect: v })}
            options={BG_EFFECTS.map(opt) as { value: BackgroundEffect; label: string }[]}
          />
          <Select<UsernameEffect>
            label="Username effect"
            value={(config.usernameEffect ?? 'none') as UsernameEffect}
            onChange={(v) => update({ usernameEffect: v })}
            options={USERNAME_EFFECTS.map(opt) as { value: UsernameEffect; label: string }[]}
          />

          <Slider
            label="Profile opacity"
            value={Math.round((config.boxOpacity ?? 0.5) * 100)}
            min={0}
            max={100}
            suffix="%"
            onChange={(v) => update({ boxOpacity: v / 100 })}
          />
          <Slider
            label="Profile blur"
            value={config.boxBlur ?? 16}
            min={0}
            max={32}
            suffix="px"
            onChange={(v) => update({ boxBlur: v })}
          />

          <div className="flex flex-col gap-3 pt-1">
            <Toggle
              label="Glow"
              checked={config.glow?.enabled ?? false}
              onChange={(on) =>
                update({
                  glow: { enabled: on, color: config.glow?.color ?? config.colors.accent, intensity: config.glow?.intensity ?? 1 },
                })
              }
            />
            {config.glow?.enabled && (
              <>
                <ColorPicker
                  label="Glow color"
                  value={config.glow.color}
                  onChange={(color) => update({ glow: { ...config.glow!, color } })}
                />
                <Slider
                  label="Glow intensity"
                  value={config.glow.intensity}
                  min={0}
                  max={2}
                  step={0.1}
                  format={(v) => `${v.toFixed(1)}×`}
                  onChange={(intensity) => update({ glow: { ...config.glow!, intensity } })}
                />
              </>
            )}
          </div>
        </CollapsibleSection>

        {/* ---------------- Colors ---------------- */}
        <CollapsibleSection title="Colors">
          <ColorPicker label="Accent" value={config.colors.accent} onChange={(v) => update({ colors: { ...config.colors, accent: v } })} />
          <ColorPicker label="Background" value={config.colors.background} onChange={(v) => update({ colors: { ...config.colors, background: v } })} />
          <ColorPicker label="Text" value={config.colors.text} onChange={(v) => update({ colors: { ...config.colors, text: v } })} />
          <ColorPicker label="Icons" value={config.colors.icon} onChange={(v) => update({ colors: { ...config.colors, icon: v } })} />
          <Toggle
            label="Profile gradient"
            description="Use a gradient background instead of solid"
            checked={config.background.type === 'gradient'}
            onChange={(on) => update({ background: { ...config.background, type: on ? 'gradient' : 'solid' } })}
          />
          {config.background.type === 'gradient' && (
            <GradientBuilder value={gradient} onChange={(g) => update({ gradient: g })} />
          )}
        </CollapsibleSection>

        {/* ---------------- Typography ---------------- */}
        <CollapsibleSection title="Typography">
          <FontSelector value={(config.font ?? 'inter') as FontFamily} onChange={(v) => update({ font: v })} />
          <Toggle
            label="Animated title"
            description="Cycle the browser tab title"
            checked={config.animatedTitle ?? false}
            onChange={(v) => update({ animatedTitle: v })}
          />
        </CollapsibleSection>

        {/* ---------------- Typewriter ---------------- */}
        {isTypewriter && (
          <CollapsibleSection title="Typewriter">
            <Slider label="Type speed" value={config.typewriterSpeed ?? 80} min={20} max={200} suffix="ms" onChange={(v) => update({ typewriterSpeed: v })} />
            <Slider label="Delete speed" value={config.typewriterDeleteSpeed ?? 40} min={10} max={150} suffix="ms" onChange={(v) => update({ typewriterDeleteSpeed: v })} />
            <Slider label="Pause" value={config.typewriterPause ?? 1500} min={500} max={4000} step={100} suffix="ms" onChange={(v) => update({ typewriterPause: v })} />
          </CollapsibleSection>
        )}

        {/* ---------------- Layout ---------------- */}
        <CollapsibleSection title="Layout">
          <LayoutSelector value={config.layout} onChange={(v) => update({ layout: v })} />

          {config.layout === 'default' && (
            <>
              <FileUpload bucket="banners" label="Profile banner" value={config.layoutSettings?.banner} onUploaded={(url) => updateLayoutSettings({ banner: url })} onClear={() => updateLayoutSettings({ banner: undefined })} />
              <ColorPicker label="Border color" value={config.layoutSettings?.borderColor ?? config.colors.accent} onChange={(v) => updateLayoutSettings({ borderColor: v })} />
              <Slider label="Border width" value={config.layoutSettings?.borderWidth ?? 1} min={0} max={4} suffix="px" onChange={(v) => updateLayoutSettings({ borderWidth: v })} />
              <Slider label="Corner radius" value={config.layoutSettings?.borderRadius ?? 16} min={0} max={32} suffix="px" onChange={(v) => updateLayoutSettings({ borderRadius: v })} />
            </>
          )}
          {config.layout === 'modern' && (
            <>
              <Link href="/dashboard/widgets" className="btn btn-secondary w-full py-2.5 text-[13px]">
                Manage second tab (widgets)
              </Link>
              <ColorPicker label="Border color" value={config.layoutSettings?.borderColor ?? config.colors.accent} onChange={(v) => updateLayoutSettings({ borderColor: v })} />
              <Slider label="Corner radius" value={config.layoutSettings?.borderRadius ?? 16} min={0} max={32} suffix="px" onChange={(v) => updateLayoutSettings({ borderRadius: v })} />
            </>
          )}
          {config.layout === 'simplistic' && (
            <p className="text-[13px]" style={{ color: 'var(--text-tertiary)' }}>
              Simplistic uses clean button-style links with no card. Adjust link alignment under the Links section.
            </p>
          )}
          {config.layout === 'sleek' && (
            <>
              <FileUpload bucket="banners" label="Banner" value={config.layoutSettings?.banner} onUploaded={(url) => updateLayoutSettings({ banner: url })} onClear={() => updateLayoutSettings({ banner: undefined })} />
              <Slider label="Banner radius" value={config.layoutSettings?.bannerRadius ?? 18} min={0} max={32} suffix="px" onChange={(v) => updateLayoutSettings({ bannerRadius: v })} />
              <Slider label="Avatar radius" value={config.layoutSettings?.avatarRadius ?? 50} min={0} max={50} suffix="%" onChange={(v) => updateLayoutSettings({ avatarRadius: v === 50 ? 999 : v })} />
              <ColorPicker label="Border color" value={config.layoutSettings?.borderColor ?? config.colors.accent} onChange={(v) => updateLayoutSettings({ borderColor: v })} />
              <Slider label="Border width" value={config.layoutSettings?.borderWidth ?? 1} min={0} max={4} suffix="px" onChange={(v) => updateLayoutSettings({ borderWidth: v })} />
            </>
          )}
        </CollapsibleSection>

        {/* ---------------- Profile Effects ---------------- */}
        <CollapsibleSection title="Profile effects">
          <Select<ProfileEffect>
            label="Card effect"
            value={(config.profileEffect ?? 'none') as ProfileEffect}
            onChange={(v) => update({ profileEffect: v })}
            options={CARD_EFFECTS.map(opt) as { value: ProfileEffect; label: string }[]}
          />
          <Select<CursorEffect>
            label="Cursor effect"
            value={(config.cursorEffect ?? 'none') as CursorEffect}
            onChange={(v) => update({ cursorEffect: v })}
            options={CURSOR_EFFECTS.map(opt) as { value: CursorEffect; label: string }[]}
          />
        </CollapsibleSection>

        {/* ---------------- Other ---------------- */}
        <CollapsibleSection title="Other">
          <Toggle label="Monochrome icons" checked={config.monochromeIcons ?? false} onChange={(v) => update({ monochromeIcons: v })} />
          <Toggle label="Swap box colors" checked={config.swapBoxColors ?? false} onChange={(v) => update({ swapBoxColors: v })} />
          <Toggle label="Use Discord avatar" description="Requires a Discord ID in Settings" checked={config.useDiscordAvatar ?? false} onChange={(v) => update({ useDiscordAvatar: v })} />
          <Toggle label="Show Discord presence" description="Requires a Discord ID in Settings" checked={config.showDiscordPresence ?? false} onChange={(v) => update({ showDiscordPresence: v })} />
        </CollapsibleSection>

        {/* ---------------- Meta / SEO ---------------- */}
        <CollapsibleSection title="Meta & SEO">
          <TextInput label="Website title" value={config.meta?.title ?? ''} onChange={(e) => update({ meta: { ...config.meta, title: e.target.value } })} placeholder={`${config.displayName} | knives.lol`} />
          <TextArea label="Website description" value={config.meta?.description ?? ''} onChange={(e) => update({ meta: { ...config.meta, description: e.target.value } })} />
          <FileUpload bucket="embeds" label="Embed image" value={config.meta?.embedImage} onUploaded={(url) => update({ meta: { ...config.meta, embedImage: url } })} onClear={() => update({ meta: { ...config.meta, embedImage: undefined } })} />
          <FileUpload bucket="embeds" label="Favicon" value={config.meta?.favicon} onUploaded={(url) => update({ meta: { ...config.meta, favicon: url } })} onClear={() => update({ meta: { ...config.meta, favicon: undefined } })} />
          <ColorPicker label="Theme color" value={config.meta?.themeColor ?? config.colors.accent} onChange={(v) => update({ meta: { ...config.meta, themeColor: v } })} />
        </CollapsibleSection>

        {/* ---------------- Entry Screen ---------------- */}
        <CollapsibleSection title="Entry screen">
          <Toggle
            label="Enable entry screen"
            description="A click-to-enter gate (also unlocks audio autoplay)"
            checked={config.entryScreen?.enabled ?? false}
            onChange={(on) => update({ entryScreen: { ...config.entryScreen, enabled: on } })}
          />
          {config.entryScreen?.enabled && (
            <>
              <TextInput
                label="Entry text"
                value={config.entryScreen?.text ?? ''}
                onChange={(e) => update({ entryScreen: { ...config.entryScreen, enabled: true, text: e.target.value } })}
                placeholder="click to enter"
              />
              <Toggle
                label="Click to enter"
                checked={config.entryScreen?.clickToEnter ?? true}
                onChange={(v) => update({ entryScreen: { ...config.entryScreen, enabled: true, clickToEnter: v } })}
              />
            </>
          )}
        </CollapsibleSection>
      </div>
    </div>
  );
}
