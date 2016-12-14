require_relative './math'
module Lucas_Lehmer
  def Lucas_Lehmer.generate_prime(bits = 17)
    if prime?(bits)
  	  mersenne_number = (2**bits)-1
    else
       puts "Невозможно найти данным методом простое число данного размера"
       return 0
  	end

    ls = [4]
    (1..bits-2).each do |n|
      ls << (((ls.last)**2) - 2)%mersenne_number
    end

    return mersenne_number if ls.last == 0
    puts "Невозможно найти данным методом простое число данного размера" if ls.last != 0 
   	0
  end
end

module Miller_Rabin
  def Miller_Rabin.miller_rabin(m,k)
    t = (m-1)/2;
    s = 1;  
    while(t%2==0)
      t/=2
      s+=1
    end

    k.times do 
      b = 0
      b = Random.rand(2..m-2)
      prime = false
      y = (b**t) % m
      if(y ==1 || y == m-1)
        prime = true
        next
       end

      (s-1).times do
      	y = (y*y) % m
        if y == (m-1)
          prime = true
          break
        end
        prime = false if y == 1
     end

     if not prime
       return false
     end
    end
  return true
end

  def Miller_Rabin.generate_prime(bits = 5)

  	if bits == 1
  	  puts "Невозможно найти простое число в данном диапазоне"
  	  return 0
  	end

  	if bits == 2
  	  return [2, 3].sample
  	elsif bits == 3
  	  return [5, 7].sample
  	elsif bits == 4
  	  return [11, 13].sample
  	end
  	arr =[]
  	to = (2**bits)-1
    from = 2**(bits-1)

    (from..to).each do |num|
      arr << num if num%2 !=0 
    end

    arr.each do |num|
     arr.delete(num) if num%3 == 0 || num%5 == 0 || num%7 == 0 || num%11 == 0 || num%13 == 0
    end	
    primes = []
    arr.each do |num|
      primes << num if Miller_Rabin.miller_rabin(num, 2)
    end
    primes.sample
  end
end
