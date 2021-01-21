# coding: utf-8

Gem::Specification.new do |spec|
  spec.name          = "mcity-theme"
  spec.version       = "0.1.170"
  spec.authors       = ["Catherine Roebuck"]
  spec.email         = ["croebuck@meridiancity.org"]

  spec.summary       = %q{Template elements for Meridian City websites}

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r{^(assets|_layouts|_includes|_sass|LICENSE|README)}i) }

  spec.add_runtime_dependency "jekyll", "~> 3.6.3"

  spec.add_development_dependency "bundler", "~> 2.0"
  spec.add_development_dependency "rake", "~> 10.0"
end
