def prime?(n, m = n / 2)
  if    (n == 1 || m == 1)  then true
  elsif (0 == n % m)        then false
  else prime?(n, m - 1)
  end
end

def coprime?(a, b)
  1 == a.gcd(b)
end

def find_coprime(m)
  res = 1
  (3..Math.sqrt(m).ceil).each do |n|
  	if prime?(n)
  	  if coprime?(m, n)
  		  res = n
  	  end
  	end
  end
  res
end

def extended_gcd(a, b)
  last_remainder, remainder = a.abs, b.abs
  x, last_x, y, last_y = 0, 1, 1, 0
  while remainder != 0
    last_remainder, (quotient, remainder) = remainder, last_remainder.divmod(remainder)
    x, last_x = last_x - quotient*x, x
    y, last_y = last_y - quotient*y, y
  end
 
  return last_remainder, last_x * (a < 0 ? -1 : 1)
end
 
def invmod(e, et)
  g, x = extended_gcd(e, et)
  if g != 1
    raise 'The maths are broken!'
  end
  x % et
end

