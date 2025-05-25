import { useState } from 'react'
import { cssVars, createColorStyle, componentStyles, setCSSVar } from '../lib/design-tokens'

export default function DesignSystem() {
  const [customPrimary, setCustomPrimary] = useState('#3b82f6')

  const handleColorChange = (color: string) => {
    setCustomPrimary(color)
    // Convert hex to oklch (simplified for demo - in practice you'd use a proper converter)
    setCSSVar('--primary', color)
  }

  const resetColors = () => {
    setCustomPrimary('#3b82f6')
    setCSSVar('--primary', 'oklch(0.485 0.224 264.052)')
  }

  return (
    <div className='min-h-screen p-8 bg-background text-foreground'>
      <div className='container mx-auto max-w-6xl'>
        <div className='text-center mb-12'>
          <h1 className='text-5xl font-bold mb-4 text-primary'>Design System</h1>
          <p className='text-xl text-muted-foreground'>
            Demonstrating custom CSS variables and design tokens
          </p>
        </div>

        {/* Color Palette */}
        <section className='mb-12'>
          <h2 className='text-3xl font-bold mb-8 text-foreground'>Color Palette</h2>
          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
            {/* Brand Colors */}
            <div className='space-y-2'>
              <div className='h-20 rounded-lg bg-primary border'></div>
              <div className='text-sm font-medium'>Primary</div>
              <div className='text-xs text-muted-foreground font-mono'>var(--color-primary)</div>
            </div>

            <div className='space-y-2'>
              <div className='h-20 rounded-lg bg-secondary border'></div>
              <div className='text-sm font-medium'>Secondary</div>
              <div className='text-xs text-muted-foreground font-mono'>var(--color-secondary)</div>
            </div>

            <div className='space-y-2'>
              <div className='h-20 rounded-lg bg-accent border'></div>
              <div className='text-sm font-medium'>Accent</div>
              <div className='text-xs text-muted-foreground font-mono'>var(--color-accent)</div>
            </div>

            {/* Status Colors */}
            <div className='space-y-2'>
              <div className='h-20 rounded-lg bg-status-success border'></div>
              <div className='text-sm font-medium'>Success</div>
              <div className='text-xs text-muted-foreground font-mono'>var(--color-success)</div>
            </div>

            <div className='space-y-2'>
              <div className='h-20 rounded-lg bg-status-warning border'></div>
              <div className='text-sm font-medium'>Warning</div>
              <div className='text-xs text-muted-foreground font-mono'>var(--color-warning)</div>
            </div>

            <div className='space-y-2'>
              <div className='h-20 rounded-lg bg-status-error border'></div>
              <div className='text-sm font-medium'>Error</div>
              <div className='text-xs text-muted-foreground font-mono'>
                var(--color-destructive)
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Color Customization */}
        <section className='mb-12'>
          <h2 className='text-3xl font-bold mb-8 text-foreground'>Dynamic Color Customization</h2>
          <div className='bg-card p-6 rounded-lg border'>
            <div className='flex items-center space-x-4 mb-6'>
              <label htmlFor='primary-color' className='text-sm font-medium'>
                Primary Color:
              </label>
              <input
                id='primary-color'
                type='color'
                value={customPrimary}
                onChange={e => handleColorChange(e.target.value)}
                className='w-10 h-10 rounded border'
              />
              <button
                onClick={resetColors}
                className='px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80'
              >
                Reset
              </button>
            </div>
            <p className='text-sm text-muted-foreground'>
              Change the primary color above to see how it affects all components using CSS
              variables.
            </p>
          </div>
        </section>

        {/* Button Variants */}
        <section className='mb-12'>
          <h2 className='text-3xl font-bold mb-8 text-foreground'>Button Variants</h2>
          <div className='space-y-4'>
            <div className='flex flex-wrap gap-4'>
              <button
                className={`px-4 py-2 rounded-md transition-colors ${componentStyles.button.primary}`}
              >
                Primary Button
              </button>
              <button
                className={`px-4 py-2 rounded-md transition-colors ${componentStyles.button.secondary}`}
              >
                Secondary Button
              </button>
              <button
                className={`px-4 py-2 rounded-md transition-colors ${componentStyles.button.destructive}`}
              >
                Destructive Button
              </button>
              <button
                className={`px-4 py-2 rounded-md transition-colors ${componentStyles.button.outline}`}
              >
                Outline Button
              </button>
              <button
                className={`px-4 py-2 rounded-md transition-colors ${componentStyles.button.ghost}`}
              >
                Ghost Button
              </button>
              <button
                className={`px-4 py-2 rounded-md transition-colors ${componentStyles.button.link}`}
              >
                Link Button
              </button>
            </div>
          </div>
        </section>

        {/* Custom Utility Classes */}
        <section className='mb-12'>
          <h2 className='text-3xl font-bold mb-8 text-foreground'>Custom Utility Classes</h2>
          <div className='grid md:grid-cols-2 gap-6'>
            <div className='space-y-4'>
              <h3 className='text-xl font-semibold'>Brand Classes</h3>
              <div className='space-y-2'>
                <div className='p-4 bg-brand-primary text-white rounded-lg'>
                  .bg-brand-primary with white text
                </div>
                <div className='p-4 bg-brand-secondary text-brand-secondary rounded-lg border'>
                  .bg-brand-secondary with .text-brand-secondary
                </div>
              </div>
            </div>

            <div className='space-y-4'>
              <h3 className='text-xl font-semibold'>Status Classes</h3>
              <div className='space-y-2'>
                <div className='p-4 bg-status-success text-white rounded-lg'>
                  .bg-status-success
                </div>
                <div className='p-4 bg-status-warning text-black rounded-lg'>
                  .bg-status-warning
                </div>
                <div className='p-4 bg-status-error text-white rounded-lg'>.bg-status-error</div>
                <div className='p-4 bg-status-info text-white rounded-lg'>.bg-status-info</div>
              </div>
            </div>
          </div>
        </section>

        {/* JavaScript Integration */}
        <section className='mb-12'>
          <h2 className='text-3xl font-bold mb-8 text-foreground'>JavaScript Integration</h2>
          <div className='grid md:grid-cols-2 gap-6'>
            <div className='bg-card p-6 rounded-lg border'>
              <h3 className='text-lg font-semibold mb-4'>Using createColorStyle()</h3>
              <div className='space-y-3'>
                <div style={createColorStyle('primary')} className='p-3 rounded-md'>
                  Primary style from JS
                </div>
                <div style={createColorStyle('success')} className='p-3 rounded-md'>
                  Success style from JS
                </div>
                <div style={createColorStyle('warning')} className='p-3 rounded-md'>
                  Warning style from JS
                </div>
              </div>
            </div>

            <div className='bg-card p-6 rounded-lg border'>
              <h3 className='text-lg font-semibold mb-4'>CSS Variables in JS</h3>
              <div className='space-y-2 text-sm font-mono'>
                <div>
                  Primary: <span className='text-primary'>{cssVars.primary}</span>
                </div>
                <div>
                  Background: <span className='text-muted-foreground'>{cssVars.background}</span>
                </div>
                <div>
                  Success: <span className='text-status-success'>{cssVars.success}</span>
                </div>
                <div>
                  Border Radius: <span className='text-accent'>{cssVars.radiusLg}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cards and Components */}
        <section className='mb-12'>
          <h2 className='text-3xl font-bold mb-8 text-foreground'>Component Examples</h2>
          <div className='grid md:grid-cols-3 gap-6'>
            <div className={`p-6 rounded-lg ${componentStyles.card}`}>
              <h3 className='text-lg font-semibold mb-2'>Default Card</h3>
              <p className='text-muted-foreground'>
                This card uses the default card styling with CSS variables.
              </p>
            </div>

            <div className='p-6 rounded-lg bg-primary text-primary-foreground'>
              <h3 className='text-lg font-semibold mb-2'>Primary Card</h3>
              <p className='opacity-90'>
                This card uses primary colors directly from CSS variables.
              </p>
            </div>

            <div className='p-6 rounded-lg bg-muted text-muted-foreground'>
              <h3 className='text-lg font-semibold mb-2'>Muted Card</h3>
              <p>This card demonstrates muted colors for subtle content.</p>
            </div>
          </div>
        </section>

        {/* Input Examples */}
        <section className='mb-12'>
          <h2 className='text-3xl font-bold mb-8 text-foreground'>Form Controls</h2>
          <div className='space-y-4 max-w-md'>
            <input
              type='text'
              placeholder='Default input with CSS variables'
              className={componentStyles.input}
            />
            <input type='email' placeholder='Email input' className={componentStyles.input} />
            <textarea
              placeholder='Textarea with consistent styling'
              className={`${componentStyles.input} min-h-[100px] resize-none`}
            />
          </div>
        </section>

        {/* CSS Variables Reference */}
        <section className='mb-12'>
          <h2 className='text-3xl font-bold mb-8 text-foreground'>CSS Variables Reference</h2>
          <div className='bg-card p-6 rounded-lg border'>
            <h3 className='text-lg font-semibold mb-4'>Available CSS Variables</h3>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm font-mono'>
              {Object.entries(cssVars).map(([key, value]) => (
                <div key={key} className='p-3 bg-muted rounded'>
                  <div className='font-semibold text-foreground'>{key}</div>
                  <div className='text-muted-foreground'>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Usage Examples */}
        <section className='mb-12'>
          <h2 className='text-3xl font-bold mb-8 text-foreground'>Usage Examples</h2>
          <div className='bg-card p-6 rounded-lg border'>
            <h3 className='text-lg font-semibold mb-4'>How to Use</h3>
            <div className='space-y-4'>
              <div>
                <h4 className='font-medium mb-2'>1. In CSS/Tailwind classes:</h4>
                <code className='block p-3 bg-muted rounded text-sm'>
                  &lt;div className="bg-primary text-primary-foreground"&gt;...&lt;/div&gt;
                </code>
              </div>

              <div>
                <h4 className='font-medium mb-2'>2. Using custom utility classes:</h4>
                <code className='block p-3 bg-muted rounded text-sm'>
                  &lt;div className="bg-brand-primary text-white"&gt;...&lt;/div&gt;
                </code>
              </div>

              <div>
                <h4 className='font-medium mb-2'>3. In JavaScript with style objects:</h4>
                <code className='block p-3 bg-muted rounded text-sm'>
                  {`style={{ backgroundColor: cssVars.primary, color: cssVars.primaryForeground }}`}
                </code>
              </div>

              <div>
                <h4 className='font-medium mb-2'>4. Direct CSS variable access:</h4>
                <code className='block p-3 bg-muted rounded text-sm'>
                  {`style={{ backgroundColor: cssVars.primary }}`}
                </code>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
