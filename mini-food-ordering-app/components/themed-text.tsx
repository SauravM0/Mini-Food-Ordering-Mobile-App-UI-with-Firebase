import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';
import typography from '@/src/theme/typography';
import colors from '@/src/theme/colors';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: typography.body,
    lineHeight: 20,
  },
  defaultSemiBold: {
    fontSize: typography.body,
    lineHeight: 20,
    fontWeight: '600',
  },
  title: {
    fontSize: typography.heading,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: typography.subheading,
    fontWeight: '600',
  },
  link: {
    lineHeight: 30,
    fontSize: typography.body,
    color: colors.primary,
  },
});
