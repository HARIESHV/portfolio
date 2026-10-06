import {
  Activity,
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  Atom,
  Award,
  BarChart3,
  Binary,
  Blocks,
  Braces,
  Briefcase,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  Cloud,
  Code,
  Coffee,
  Compass,
  Cpu,
  Database,
  Download,
  ExternalLink,
  Eye,
  FileCheck,
  FileCode,
  FileSpreadsheet,
  FileText,
  Gauge,
  GitBranch,
  Github,
  GraduationCap,
  Hexagon,
  Layers,
  Layout,
  Leaf,
  Linkedin,
  LoaderCircle,
  Mail,
  MapPin,
  Maximize2,
  Menu,
  Minimize2,
  Palette,
  Phone,
  Presentation,
  Quote,
  Rocket,
  RotateCcw,
  Route,
  Send,
  Sparkles,
  Target,
  Triangle,
  Wind,
  Workflow,
  Wrench,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';

/**
 * Explicit icon registry.
 *
 * Data files reference icons by name. Mapping them here with static imports
 * (rather than importing the whole `lucide-react` namespace) keeps the bundle
 * tree-shakeable, so only the glyphs actually rendered are shipped.
 *
 * All glyphs share one stroke width so the icon set reads as a single family.
 */
const ICONS = {
  Activity,
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  Atom,
  Award,
  BarChart3,
  Binary,
  Blocks,
  Braces,
  Briefcase,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  Cloud,
  Code,
  Coffee,
  Compass,
  Cpu,
  Database,
  Download,
  ExternalLink,
  Eye,
  FileCheck,
  FileCode,
  FileSpreadsheet,
  FileText,
  Gauge,
  GitBranch,
  Github,
  GraduationCap,
  Hexagon,
  Layers,
  Layout,
  Leaf,
  Linkedin,
  LoaderCircle,
  Mail,
  MapPin,
  Maximize2,
  Menu,
  Minimize2,
  Palette,
  Phone,
  Presentation,
  Quote,
  Rocket,
  RotateCcw,
  Route,
  Send,
  Sparkles,
  Target,
  Triangle,
  Wind,
  Workflow,
  Wrench,
  X,
  ZoomIn,
  ZoomOut,
};

export const ICON_NAMES = Object.keys(ICONS);

/** Shared stroke width, applied across the whole icon set. */
const STROKE_WIDTH = 1.5;

export function Icon({ name, size = 20, strokeWidth = STROKE_WIDTH, className, ...props }) {
  const Glyph = ICONS[name];

  // A missing icon must never crash a page. Log once in development and render
  // nothing so the layout stays intact.
  if (!Glyph) {
    if (import.meta.env.DEV) {
      console.warn(`[Icon] Unknown icon name: "${name}". Add it to components/ui/Icon.jsx.`);
    }
    return null;
  }

  return (
    <Glyph
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden="true"
      focusable="false"
      {...props}
    />
  );
}

export default Icon;
