const sqlInjectionPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|EXEC)\b\s*|\-\-|\;)/i,
    /(\bOR\b\s+[^\w]*|\/\*.*\*\/)/i,
    /(['"]\s*=\s*['"]|['"]\s*(AND|OR)\s*['"])/i,
  ];

export const messageSqlInjection = "El campo contiene caracteres no permitidos."
  
export const containsSQLInjection = (value: string) => {
    return sqlInjectionPatterns.some((pattern) => pattern.test(value));
  };